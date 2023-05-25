import changeValue from "./increOrDecre";
import userEmail from "./userGetEmail";
import userRegistration from "./userReducer";
import allBrands from "./brandReducer";
import allCategories from "./categoryReducer";
import allProducts from "./productReducer";
import allSpareParts from "./sparePartReducer";
import addToCart from "./cartReducer";
import checkout from "./checkoutReducer";
import allOrders from "./orderReducer";
import currentOrder from "./currentOrder";

const { combineReducers } = require("redux");

const rootReducer=combineReducers({
      value: changeValue,
      users:userRegistration,
      userEmail:userEmail,
      brands:allBrands,
      categories:allCategories,
      products:allProducts,
      spareParrts:allSpareParts,
      cartItems:addToCart,
      checkoutData:checkout,
      orders:allOrders,
      currentOrder:currentOrder
})

export default rootReducer;