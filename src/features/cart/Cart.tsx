import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../types";
import { requestRemoveProduct, selectCartItems } from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  console.log("CART : ", cartItems);
  function isCartEmpty() {
    return cartItems.length < 1;
  }

  const handleRemoveItem = (product: Product) => {
    console.log("CLICKED");
    dispatch(requestRemoveProduct(product));
  };

  return (
    <div>
      <p>CART</p>
      {isCartEmpty() ? (
        <span>No ITEMS IN CART</span>
      ) : (
        <span style={{ display: "flex", flexDirection: "column" }}>
          {cartItems.map((product, idx) => (
            <span
              key={idx}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                border: "solid green 3px",
                width: "300px",
              }}
            >
              <p>{product.title}</p>
              <p>{product.price}</p>
              <button onClick={() => handleRemoveItem(product)}>delete</button>
            </span>
          ))}
        </span>
      )}
    </div>
  );
};

export default Cart;
