import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist";


const persistConfig={
    key:"persist-store",
    storage 
}

const persistedReducer=persistReducer(persistConfig,rootReducer)
 const store=createStore(persistedReducer,{},applyMiddleware(thunk))
 export default store;
 
 
//  const store=createStore(rootReducer,{},applyMiddleware(thunk))
//  export default store;
 