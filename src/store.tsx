import { loadState, saveState } from "./localStorage";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "components/todoList/features";
import {apiSlice} from "./components/todoList/services/apiSlice";

const preloadedState = loadState();

const store = configureStore({
  preloadedState,
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
