import { configureStore } from "@reduxjs/toolkit";
import liveClassReducer from "./liveClassSlice";

const store = configureStore({
  reducer: {
    liveClass: liveClassReducer,
  },
});

export default store;
