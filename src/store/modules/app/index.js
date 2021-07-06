import { NAME } from './constants';
import * as actions from './actions';
import reducer from './reducer';

//to reduce the number of bugs, make sure not to export action types.
//action types are internal only and only actions and reducer should access them

export default {
  NAME,
  actions,
  reducer,
};
