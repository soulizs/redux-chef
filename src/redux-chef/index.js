const __CHEF_INTERNAL_TYPE__ = '@@__CHEF_INTERNAL_TYPE__';

let store$;
let namespace$;

function internalReducer(state, action) {
  if (action.type.includes(__CHEF_INTERNAL_TYPE__)) {
    return {
      ...state,
      [namespace$]: action.data
    };
  } else {
    return state;
  }
}

export default function chef(models) {
  const reducers = {};
  const preloadState = {};

  models.forEach(({ namespace, state, reducer }) => {
    preloadState[namespace] = state;
    reducers[namespace] = reducer;
  });

  const reducerKeys = Object.keys(reducers);

  const reducer = (state, action) => {
    const _state = Object.assign({}, state);

    reducerKeys.forEach(reducerName => {
      _state[reducerName] = reducers[reducerName](_state[reducerName], action);
    });

    return internalReducer(_state, action);
  };

  return { reducer, preloadState };
}

chef.apply = store => {
  store$ = store;
};

export function dispatch(action) {
  if (!store$) {
    throw new Error(
      'You should apply store to chef first. e.g. `chef.apply(store)`'
    );
  }
  store$.dispatch(action);
}

export function cook(model) {
  const { namespace, action } = model;
  const inspectAction = {};
  const actionKeys = Object.keys(action);

  actionKeys.forEach(key => {
    const a = action[key];

    inspectAction[key] = (...args) => {
      namespace$ = namespace;
      let data = a(...args);
      if (typeof data === 'function') {
        data = data(store$.getState()[namespace]);
      }
      store$.dispatch({
        type: __CHEF_INTERNAL_TYPE__ + `(${key})`,
        data
      });
      namespace$ = '';
    };
  });

  return {
    ...model,
    ...inspectAction,
    action: inspectAction
  };
}
