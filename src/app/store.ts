import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
  counterReducer,
  notificationsReducer,
  productsReducer,
  productsDetailsReducer,
  cartReducer,
} from "../features/";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    notifications: notificationsReducer,
    products: productsReducer,
    productDetails: productsDetailsReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
