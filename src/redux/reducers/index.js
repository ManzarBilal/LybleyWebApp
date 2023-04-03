import changeValue from "./increOrDecre";
import userRegistration from "./userReducer";
const { combineReducers } = require("redux");

const rootReducer=combineReducers({
      value: changeValue,
      users:userRegistration,
})

export default rootReducer;