import { combineReducers } from "redux";
import alert from "./alert";
import Auth from "./register";

export default combineReducers({ alert, Auth });
