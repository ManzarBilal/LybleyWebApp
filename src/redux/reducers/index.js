import changeValue from "./increOrDecre";
import userEmail from "./userGetEmail";
import userRegistration from "./userReducer";
import allBrands from "./brandReducer";
import allCategories from "./categoryReducer";
import allProducts from "./productReducer";
const { combineReducers } = require("redux");

const rootReducer=combineReducers({
      value: changeValue,
      users:userRegistration,
      userEmail:userEmail,
      brands:allBrands,
      categories:allCategories,
      products:allProducts,
})

export default rootReducer;