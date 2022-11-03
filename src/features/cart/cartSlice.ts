import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, Product } from "../../types";
import { add } from "../../utils";

const initialState: CartState = {
  cart: [],
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

export const {} = cartSlice.actions;

export default cartSlice.reducer;
