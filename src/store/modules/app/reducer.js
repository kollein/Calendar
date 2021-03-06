import { handleActions } from 'redux-actions';
import {
  INCREMENT,
  DECREMENT,
  ADD_NEW_COUNTER,
  GET_MODEL_LIST,
} from './constants';

const initialState = {
  idGen: 0,
  counters: {},
  modelList: [],
};

//you can do better here, I was just showing that you need to make a new copy
//of state. It is ok to deep copy of state. It will prevent unseen bugs in the future
//for better performance you can use immutableJS

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions(
  {
    [ADD_NEW_COUNTER]: (state, action) => {
      const { idGen } = state;
      const newId = idGen + 1;

      //this reducer basically generate a new id for new counter and
      //assign value 0 to that id.

      return {
        ...state,
        idGen: newId,
        counters: {
          ...state.counters,
          [newId]: 0,
        },
      };
    },
    [INCREMENT]: (state, action) => {
      const {
        payload: { id },
      } = action;

      //because payload contains the id and we already know that we are about
      //to increment the value of that id, we modify only that value by one

      return {
        ...state,
        counters: {
          ...state.counters,
          [id]: state.counters[id] + 1,
        },
      };
    },
    [DECREMENT]: (state, action) => {
      const {
        payload: { id },
      } = action;

      //this is exatcly similar as previous reducer, except we are decrementing

      return {
        ...state,
        counters: {
          ...state.counters,
          [id]: state.counters[id] - 1,
        },
      };
    },
    [GET_MODEL_LIST]: (state, action) => {
      const {
        payload: { data },
      } = action;
      return {
        ...state,
        modelList: data,
      };
    },
  },
  initialState,
);
