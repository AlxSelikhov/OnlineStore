// src/redux/reducers.ts
import { combineReducers } from "redux";
import { Product, CartItem } from "./types";
import { Middleware } from "redux";
import { RootState } from "./store";

interface ProductAction {
  type: string;
  payload: Product[];
}

interface CartAction {
  type: string;
  payload: CartItem;
}

interface RemoveAllFromCartAction {
  type: "REMOVE_ALL_FROM_CART";
}

const productsReducer = (state: Product[] = [], action: ProductAction) => {
  switch (action.type) {
    case "SAVE_PRODUCTS":
      return action.payload;
    default:
      return state;
  }
};

const cartReducer = (state: CartItem[] = [], action: CartAction) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { name } = action.payload;
      const existingItem = state.find((item) => item.name === name);

      if (existingItem) {
        return state.map((item) =>
          item.name === name
            ? {
                ...item,
                quantity: (item.quantity ?? 0) + (action.payload.quantity ?? 0),
                total: (item.total ?? 0) + (action.payload.total ?? 0),
              }
            : item
        );
      } else {
        return [...state, action.payload];
      }

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.name !== action.payload.name);

    case "REMOVE_ALL_FROM_CART":
      return [];

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.name === action.payload.name
          ? {
              ...item,
              quantity: action.payload.quantity,
              total: item.price * action.payload.quantity,
            }
          : item
      );

    default:
      return state;
  }
};

const saveState = (state: RootState) => {
  try {
    const serializedState: string = JSON.stringify(state);
    localStorage.setItem("appState", serializedState);
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }
};

// Middleware для сохранения состояния в localStorage
export const localStorageMiddleware: Middleware<RootState> =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    saveState(state);
    return result;
  };

const rootReducer = combineReducers({
  products: productsReducer,
  cartItems: cartReducer,
});

export default rootReducer;
