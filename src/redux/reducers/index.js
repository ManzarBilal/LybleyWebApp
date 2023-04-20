import changeValue from "./increOrDecre";
import userEmail from "./userGetEmail";
import userRegistration from "./userReducer";
import allBrands from "./brandReducer";
import allCategories from "./categoryReducer";
import allProducts from "./productReducer";
import allSpareParts from "./faultReducer";

const { combineReducers } = require("redux");

const rootReducer=combineReducers({
      value: changeValue,
      users:userRegistration,
      userEmail:userEmail,
      brands:allBrands,
      categories:allCategories,
      products:allProducts,
      spareParrts:allSpareParts,
})

export default rootReducer;