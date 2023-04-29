import { configureStore } from "@reduxjs/toolkit";
// import reducer from "components/todoList/features";
import {apiSlice} from "./components/todoList/services/apiSlice";
import authReducer from './components/todoList/features/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
