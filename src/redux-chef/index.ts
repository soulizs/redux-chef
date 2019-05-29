import { ChefModel, Actions, Reducer, Reducers, State, Meal } from './type';
import { warn } from './util';

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

function Chef(models: ChefModel[]): Meal {
  const preloadState: State = {};
  const reducers: Reducers = {};
  let namespaces: string[] = [];

  models.forEach(model => {
    const { namespace, state, reducer } = model;
    if (namespaces.includes(namespace)) {
      warn(`This namespace(${namespace}) will be ignore.`);
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
  const { namespace, action } = model;
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

export function kitchen(models: ChefModel[]): ChefModel[] {
  return models.map(cook);
}

Chef.apply = (store: any) => {
  store$ = store;
}

export default Chef;
