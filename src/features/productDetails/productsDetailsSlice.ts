import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Product, ProductsDetailsState } from "../../types";

const initialState: ProductsDetailsState = {
  detail: {
    productId: "857b2ae73205",
    title: "Officia",
    images: [
      {
        url: "https://via.placeholder.com/350",
        alt: "Lorem ipsum dolor sit amet.",
      },
      {
        url: "https://via.placeholder.com/400",
        alt: "Lorem ipsum dolor sit amet.",
      },
      {
        url: "https://via.placeholder.com/350",
        alt: "Lorem ipsum dolor sit amet.",
      },
      {
        url: "https://via.placeholder.com/400",
        alt: "Lorem ipsum dolor sit amet.",
      },
      {
        url: "https://via.placeholder.com/350",
        alt: "Lorem ipsum dolor sit amet.",
      },
      {
        url: "https://via.placeholder.com/400",
        alt: "Lorem ipsum dolor sit amet.",
      },
    ],
    about:
      "\tLorem ipsum dolor sit amet, officia elit cupidatat sint et Lorem anim quis laboris aliqua. anim elit ipsum adipisicing eiusmod. Non do laborum pariatur eiusmod qui reprehenderit exercitation nisi cillum officia magna officia adipisicing nulla nisi occaecat velit.",
    details: [
      "Lorem ipsum dolor sit amet, ex et non adipisicing ex aliqua in do ut ullamco incididunt.",
      "Lorem ipsum dolor sit amet, laboris esse aliquip irure .",
    ],
    options: [
      {
        name: "size",
        style: "dropdown",
        values: [
          {
            value: "14",
          },
          {
            value: "28",
          },
        ],
      },
      {
        name: "category",
        style: "button group",
        values: [
          {
            value: "Pesse deserunt",
          },
          {
            value: "enim enim deserunt",
          },
          {
            value: "velit Lorem",
          },
        ],
      },
    ],
  },
};

export const productsDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    requestSetProducts: (
      state: ProductsDetailsState,
      action: PayloadAction<Product>
    ) => {
      return {
        ...state,
        detail: action.payload,
      };
    },
  },
});

export const selectProductDetail = (state: RootState) => state.productDetails;

export const {} = productsDetailsSlice.actions;

export default productsDetailsSlice.reducer;
