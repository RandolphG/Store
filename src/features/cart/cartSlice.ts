import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CartState, Product } from "../../types";
import { add, remove, removeItem } from "../../utils";

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    requestAddProduct: (state: CartState, action: PayloadAction<Product>) => {
      return {
        ...state,
        items: add(state.items, action.payload) as Product[],
      };
    },
    requestRemoveProduct: (
      state: CartState,
      action: PayloadAction<Product>
    ) => {
      console.log("ACTION_REMOVE : ", action.payload);

      console.log("REMOVE_ACTION: ", {
        ...state,
        items: removeItem(state.items, action.payload),
      });
      return {
        ...state,
        items: removeItem(state.items, action.payload),
      };
    },
    requestEmptyCart: (state: CartState, action: PayloadAction<Product>) => {
      console.log("ACTION_EMPTY_CART");
      /*return {
        ...state,
        items: add(state.items, action.payload) as Product[],
      };*/
    },
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;

export const { requestAddProduct, requestRemoveProduct, requestEmptyCart } =
  cartSlice.actions;

export default cartSlice.reducer;
