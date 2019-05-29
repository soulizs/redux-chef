import constants from '../constants';
import { dispatch } from '../redux-chef/index.ts';

export function setCordX(x) {
  dispatch({
    type: constants.SET_CORD_X,
    x
  });
}

export function setCordY(y) {
  dispatch({
    type: constants.SET_CORD_Y,
    y
  });
}

export function addPoints(point) {
  dispatch({
    type: constants.ADD_POINTS,
    point
  });
}

export function clearPoints() {
  dispatch({
    type: constants.CLEAR_POINTS
  });
}
