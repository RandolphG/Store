import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Product, ProductsDetailsState } from "../../types";
import { dummyProductData } from "../../utils";

const initialState: ProductsDetailsState = {
  product: dummyProductData,
};

export const productsDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    requestSetProductDetails: (
      state: ProductsDetailsState,
      action: PayloadAction<Product>
    ) => {
      return {
        ...state,
        product: action.payload,
      };
    },
  },
});

export const selectProductDetail = (state: RootState) => state.productDetails;

export const { requestSetProductDetails } = productsDetailsSlice.actions;

export default productsDetailsSlice.reducer;
