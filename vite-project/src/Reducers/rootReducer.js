// Here we import all the project reducers and export rootReducer to the store

import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartReducer";
import adminReducer from "./reducers/adminReducer";

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  admin: adminReducer,
});

export default rootReducer;