 
import {  persistStore } from "redux-persist";
import store from "./store";


 
 const persistStor=persistStore(store)
 export default persistStor;
 