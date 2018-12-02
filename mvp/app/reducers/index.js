import { combineReducers } from 'redux'
import userReducer from "./userReducer";
import commonReducer from "./commonReducer";
import courseReducer from "./courseReducer";

const rootReducer = combineReducers({
  user: userReducer,
  course: courseReducer,
  common: commonReducer,
});

export default rootReducer
