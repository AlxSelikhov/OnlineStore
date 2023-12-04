// src/redux/store.ts

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer, { localStorageMiddleware } from "./reducers";

const savedState = localStorage.getItem("appState");
const initialState = savedState ? JSON.parse(savedState) : undefined;

// Передайте начальное состояние в store
const store = createStore(rootReducer, initialState, applyMiddleware(thunk, localStorageMiddleware));

export type RootState = ReturnType<typeof rootReducer>;

export default store;
