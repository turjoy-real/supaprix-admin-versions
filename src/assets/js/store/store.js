// import * as firebase from "firebase/app";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
  // accounts: accountsReducer,
  // products: productsReducer,
  // cart: cartReducer,
  // orders: ordersReducer,
  auth: authReducer,
  // shopAdmins: shopAdminReducer,
  // wishList: wishListReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
// var firebaseConfig = {
//   apiKey: "AIzaSyBwo56YgfFAA4oyb3sRTxtktPkHmKGHkCQ",
//   authDomain: "supaprix-94a84.firebaseapp.com",
//   databaseURL: "https://supaprix-94a84-default-rtdb.firebaseio.com",
//   projectId: "supaprix-94a84",
//   storageBucket: "supaprix-94a84.appspot.com",
//   messagingSenderId: "392347918670",
//   appId: "1:392347918670:web:06686529b4496bf65ebe1f",
//   measurementId: "G-M19BGSLRJV",
// };

// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig);
// }
