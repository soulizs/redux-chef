import constants from '../constants';
import { cook } from '../redux-chef/index.ts';

export const Cord = cook({
  namespace: 'cord',
  state: { x: 3, y: 4 },
  action: {
    update(x, y) {
      return { x, y };
    },
    setDoubleX: () => state => {
      return {
        ...state,
        x: state.x * 2
      }
    }
  },
  reducer: function(state, action) {
    switch (action.type) {
      case constants.SET_CORD_X:
        return {
          ...state,
          x: action.x
        };
      case constants.SET_CORD_Y:
        return {
          ...state,
          y: action.y
        };
      default:
        return state;
    }
  }
});

export const Points = {
  namespace: 'points',
  state: [],
  reducer: function(state, action) {
    switch (action.type) {
      case constants.ADD_POINTS:
        return state.concat(action.point);
      case constants.CLEAR_POINTS:
        return [];
      default:
        return state;
    }
  }
};

export default [Cord, Points];
