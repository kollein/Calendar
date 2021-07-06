import { INCREMENT, DECREMENT, ADD_NEW_COUNTER } from './constants';

//each action should have the following signiture.
//  {
//     type: <type of action>,        type is required
//     payload: <the actual payload>  payload is optional. if you don't
//                                    have anything to send to reducer,
//                                    you don't need the payload. for example
//                                    newCounter action
//  }

//this action tell the reducer which counter with specified id needs to be
//incremented.
export const increment = (id) => {
  return {
    type: INCREMENT,
    payload: {
      id,
    },
  };
};

//this action tell the reducer which counter with specified id needs to be
//decremented.
export const decrement = (id) => {
  return {
    type: DECREMENT,
    payload: {
      id,
    },
  };
};

//tells the reducer, we need a new counter on the scene with a new ID
export const newCounter = () => {
  return {
    type: ADD_NEW_COUNTER,
  };
};

const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok');
    }, ms);
  });
};

export const incrementWithDelay = (id) => {
  return async (dispatch, getState) => {
    await delay(1000);
    dispatch({
      type: INCREMENT,
      payload: {
        id,
      },
    });
  };
};
