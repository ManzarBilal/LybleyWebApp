import changeValue from "./increOrDecre";
import userEmail from "./userGetEmail";
import userRegistration from "./userReducer";
const { combineReducers } = require("redux");

const rootReducer=combineReducers({
      value: changeValue,
      users:userRegistration,
      userEmail:userEmail,
})

export default rootReducer;