import { configureStore } from "@reduxjs/toolkit";
import authenticationSliceReducer from "./Authentication/AuthenticationSlice";


export default configureStore({
  reducer: {
    authentication_user: authenticationSliceReducer,
   
  },
});

