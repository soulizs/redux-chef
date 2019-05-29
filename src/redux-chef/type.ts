export interface Action {
  (...args: any[]): any
}

export interface Reducer<T> {
  (state: T, action: Action): T;
}

export interface Reducers {
  [key: string]: Reducer<any>;
}

export interface Actions {
  [key: string]: Action
}

export interface State {
  [key: string]: any;
}

export interface ChefModel {
  namespace: string;
  state: any;
  action?: Actions;
  reducer: Reducer<any>;
}

export interface ChefModelMap {
  [key: string]: ChefModel
}

export interface Meal {
  reducer: Reducer<any>;
  preloadState: State;
}
