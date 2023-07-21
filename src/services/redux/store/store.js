import UserLoginReducer from "../reducer/userLoginReducer";
import UserSignupReducer from "../reducer/userSignupReducer.js";
import UserUpdateReducer from "../reducer/userUpdateReducer.js";
import AdminLoginReducer from "../reducer/adminLoginReducer";

import ApiUrlReducer from "../reducer/urlReducer";
import { combineReducers, legacy_createStore as createStore } from "redux";

const rootReducer = combineReducers({
    UserSignup: UserSignupReducer,
    UserLogin: UserLoginReducer,
    AdminLogin: AdminLoginReducer,
    UserUpdate: UserUpdateReducer,
    APIURL: ApiUrlReducer,
  });

const store = createStore(rootReducer);

export default store;


