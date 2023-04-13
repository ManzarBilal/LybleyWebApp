import changeValue from "./increOrDecre";
import userEmail from "./userGetEmail";
import userRegistration from "./userReducer";
import allBrands from "./brandReducer";
const { combineReducers } = require("redux");

const rootReducer=combineReducers({
      value: changeValue,
      users:userRegistration,
      userEmail:userEmail,
      brands:allBrands
})

export default rootReducer;