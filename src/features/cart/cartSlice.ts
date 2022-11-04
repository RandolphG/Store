import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CartState, Product } from "../../types";
import { add } from "../../utils";

const initialState: CartState = {
  cart: [],
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    requestAddProduct: (state: CartState, action: PayloadAction<Product>) => {
      return {
        ...state,
        cart: add(state.cart, action.payload) as Product[],
      };
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { requestAddProduct } = cartSlice.actions;

export default cartSlice.reducer;
