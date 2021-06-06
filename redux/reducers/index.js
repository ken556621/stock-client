import { combineReducers } from "redux";
import user from "./user";
import stock from "./stock";

export default combineReducers({
    user,
    stock
});