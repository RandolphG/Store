import { store } from "../../app/store";
import { requestSetProducts, requestSetLoaded } from "./productSlice";

test("should update the products to display", () => {
  let state = store.getState();

  expect(state.products).toEqual({ loaded: false, products: [] });

  const newProduct = [
    {
      id: "001",
      price: 12.99,
      title: "new-product",
      category: ["MENS", "WOMENS"],
      images: [
        {
          url: "https://via.placeholder.com/250",
          alt: "Lorem ipsum dolor sit amet.",
        },
      ],
      about: "Lorem ipsum dolor sit amet, officia elit cupidatat sint .",
      details: ["Lorem ipsum dolor sit amet, "],
      options: [
        {
          name: "size",
          style: "dropdown",
          values: [
            {
              value: "14",
            },
          ],
        },
        {
          name: "category",
          style: "button group",
          values: [
            {
              value: "velit Lorem",
            },
          ],
        },
      ],
    },
  ];
});
