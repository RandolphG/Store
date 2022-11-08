import { motion } from "framer-motion";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import {
  animationSettings,
  defaultUrl,
  removeTrailingSpace,
} from "../../utils";
import { ThumbSlider } from "../common";
import { useProductsPage } from "./useProductsPage";
import "./ProductPageStyles.scss";

/**
 * ProductPage
 */
const ProductPage: FC = () => {
  const { products, items, handleSetProductDetails, handleAddProduct } =
    useProductsPage();

  return (
    <motion.div key={`home-page`} className="main" {...animationSettings}>
      <div className="container">
        <div className="navbar">
          <h1 className="title">Online Store</h1>
          <h1 className="language">EN</h1>
          <h1 className="account">Account</h1>
          <h1 className="cart">
            <NavLink
              className="cart-title"
              aria-label={`Go to cart page`}
              to={`/cart`}
            >
              <span>Shopping</span>
              <span>Basket</span>
            </NavLink>
            <span className="cart-quantity">{items.length}</span>
          </h1>
        </div>
        <blockquote className="quote">
          <p className="font-italic">
            Lorem ipsum dolor sit amet, exercitation exercitation ea velit eu
            laborum Lorem occaecat ea.
          </p>
          <ThumbSlider />
        </blockquote>
        <div className="subheader">
          <h2 className="subtitle">Products</h2>
        </div>
        <div className="cards">
          <div className="outer-border">
            {products &&
              products.map((product, idx) => {
                if (!product.about || !product.about.length) {
                  return <div>NOTHING TO DISPLAY</div>;
                }

                const shortText = product.about.substring(0, 125);
                const displayText = removeTrailingSpace(shortText);

                return (
                  <div key={`product-${product.id}-${idx}`} className="card">
                    <a aria-label={`Go to details page for ${product.title}`}>
                      <img
                        className="card-img"
                        src={product.images[0].url || defaultUrl}
                        alt=""
                        height="250"
                        role="presentation"
                      />
                    </a>
                    <div className="card-body">
                      <span className="card-header-area">
                        <NavLink
                          className="card-title"
                          aria-label={`Go to details page for ${product.title}`}
                          to={`/${product.id}`}
                        >
                          <h3
                            onClick={() => {
                              handleSetProductDetails(product);
                            }}
                            className="card-title"
                          >
                            {product.title}
                          </h3>
                        </NavLink>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            handleAddProduct(product);
                          }}
                        >
                          BUY
                        </button>
                      </span>
                      <span>
                        <span>{`${displayText}... `}</span>
                        <br />
                        <br />
                        <span className="sr-only">Read more about </span>
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;
