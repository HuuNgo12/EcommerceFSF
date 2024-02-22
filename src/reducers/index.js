import { combineReducers } from "redux";
import userReducer from "./userReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // Cấu hình middleware và các tùy chọn khác nếu cần
});

export default store;
