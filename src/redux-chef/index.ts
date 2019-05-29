import { ChefModel, ChefModelMap, Actions, Reducer, Reducers, State, Meal } from './type';

const __CHEF_INTERNAL_TYPE__ = '__CHEF_INTERNAL_TYPE__';
const generateChefInternalType = (name: string): string =>
  `@@${__CHEF_INTERNAL_TYPE__}(${name})`;

let store$: any;
let namespace$: string;

function internalReducer(state: any, action: any) {
  if (action.type.includes(__CHEF_INTERNAL_TYPE__)) {
    return {
      ...state, [namespace$]: action.data
    };
  } else {
    return state;
  }
}

function Chef(models: ChefModelMap): Meal {
  const preloadState: State = {};
  const reducers: Reducers = {};
  const modelNames = Object.keys(models);
  let namespaces: string[] = [];

  modelNames.forEach(name => {
    const model = models[name];
    const { namespace, state, reducer } = model;
    if (namespaces.includes(namespace)) {
      warn(`${name}'s namespace -> \`${namespace}\` will be ignore.`);
    } else {
      preloadState[namespace] = state;
      reducers[namespace] = reducer;
      namespaces = namespaces.concat(namespace);
    }
  });

  const reducer: Reducer<any> = (state: any, action: any) => {
    const ownState = Object.assign({}, state);
    
    namespaces.forEach(ns => {
      ownState[ns] = reducers[ns](ownState[ns], action);
    });

    return internalReducer(ownState, action);
  };

  return { reducer, preloadState };
}

export function dispatch(action: any) {
  if (!store$) {
    throw new Error(
      'You should apply store to chef first. e.g. `Chef.apply(store)`'
    );
  }
  store$.dispatch(action);
}

export function cook(model: ChefModel): ChefModel {
  const { namespace, action = {} } = model;
  const observedKeys = Object.keys(action);
  const observedActions: Actions = {};

  observedKeys.forEach(key => {
    const a = action[key];

    observedActions[key] = (...args: any[]) => {
      namespace$ = namespace;
      let data = a(...args);
      
      if (typeof data === 'function') {
        data = data(store$.getState()[namespace]);
      }

      dispatch({
        type: generateChefInternalType(key), data
      });

      namespace$ = '';
    }
  });

  return {
    ...model,
    ...observedActions,
    action: observedActions
  }
}

export function kitchen(models: ChefModel[] | ChefModelMap): ChefModel[] | ChefModelMap {
  if(Array.isArray(models)) {
    return (models as ChefModel[]).map(cook);
  }
  if(Object.prototype.toString.call(models).match(/Object/)) {
    const keys = Object.keys(models);
    keys.forEach(key => {
      models[key] = cook(models[key]);
    });
    return models as ChefModelMap;
  }
  throw new Error('Kitchen can only cook array of models or models\' map.');
}

function warn(msg: string) {
  console.warn(`redux-chef: ${msg}`);
}

Chef.apply = (store: any) => {
  store$ = store;
}

export default Chef;
