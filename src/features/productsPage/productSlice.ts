import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products, ProductsState } from "../../types";

const initialState: ProductsState = {
  products: [],
  loaded: false,
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
    requestSetLoaded: (state: ProductsState, _action: PayloadAction) => {
      return {
        ...state,
        loaded: true,
      };
    },
  },
});

export const selectProducts = (state: ProductsState) => state.products;

export const selectLoaded = (state: ProductsState) => state.loaded;

export const { requestSetProducts, requestSetLoaded } = productsSlice.actions;

export default productsSlice.reducer;
