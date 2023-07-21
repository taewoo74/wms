import  {  access_token }  from "./reducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

const persistConfig = {
    key: "root",  
    storage, 
  };

  const rootReducer = combineReducers({ access_token : access_token  });

export default persistReducer(persistConfig, rootReducer);