import changeValue from "./increOrDecre";
const { combineReducers } = require("redux");

const rootReducer=combineReducers({
      value: changeValue,
})

export default rootReducer;