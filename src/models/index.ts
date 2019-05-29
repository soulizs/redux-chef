import constants from '../constants';
import { kitchen } from '../redux-chef';

const Cord = {
  namespace: 'cord',
  state: { x: 3, y: 4 },
  action: {
    update(x: number, y: number) {
      return { x, y };
    },
    setDoubleX: () => (state: any) => {
      return {
        ...state,
        x: state.x * 2
      }
    }
  },
  reducer: function (state: any, action: any) {
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
};

const Points = {
  namespace: 'points',
  state: [],
  reducer: function (state: any, action: any) {
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

export default kitchen({ Cord, Points });
