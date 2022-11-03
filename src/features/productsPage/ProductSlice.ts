import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Products, ProductsState } from "../../types";

const initialState: ProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    requestSetProducts: (
      state: ProductsState,
      action: PayloadAction<Products>
    ) => {
      return {
        ...state,
        products: action.payload,
      };
    },
  },
});

export const selectProducts = (state: RootState) => state.products;

export const { requestSetProducts } = productsSlice.actions;

export default productsSlice.reducer;
