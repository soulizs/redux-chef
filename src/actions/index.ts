import constants from '../constants';
import { dispatch } from '../redux-chef';

export function setCordX(x: number) {
  dispatch({
    type: constants.SET_CORD_X,
    x
  });
}

export function setCordY(y: number) {
  dispatch({
    type: constants.SET_CORD_Y,
    y
  });
}

export function addPoints(point: number) {
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
