import React, { FC } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

import { Option, Value } from "../../types";
import { animationSettings, fadeInUp, slideOut } from "../../utils";
import "./ProductDetailsStyles.scss";
import { Slider } from "../common";
import { selectProductDetail } from "./productsDetailsSlice";
import { useProductDetails } from "./useProductDetails";

const ProductDetails: FC = () => {
  const { product } = useProductDetails();
  return (
    <motion.div key={`details`} className="details" {...animationSettings}>
      <div className="outer-border">
        <div className="navbar">
          <h1 className="title">Online Store</h1>
        </div>
        <div className="inner-border">
          {/*<div key="slick" className="slick">
            <motion.img
              {...scaleUp}
              className="image"
              src={product.images[0].url}
              alt={product.images[0].alt}
            />
            <Slider
              infinite={false}
              speed={500}
              slidesToShow={4}
              slidesToScroll={4}
              className="slider"
            >
              {product &&
                product.images.map((image, idx) => (
                  <div key={`img-${idx}`} className="img-container">
                    <img
                      className="img-item"
                      src={image.url || defaultUrl}
                      alt={image.alt || defaultAlt}
                      style={{
                        border: idx === selectedImg ? "1px dotted black" : 0,
                      }}
                      onClick={() => setSelectedImg(idx)}
                    />
                  </div>
                ))}
            </Slider>
          </div>*/}
          <Slider />
          <motion.div className="information" {...animationSettings}>
            <motion.div className="description">
              <div className="top">
                <motion.h1 {...fadeInUp} className="name">
                  {product && product.title}
                </motion.h1>
                <NavLink to={`/`}>
                  <motion.div {...slideOut} className="back-button">
                    BACK
                  </motion.div>
                </NavLink>
              </div>
              <motion.p {...slideOut} className="about">
                {product && product.about}
              </motion.p>
            </motion.div>
            {product &&
              product.options.map((option: Option, idx: number) => {
                switch (option.style) {
                  case "dropdown":
                    return (
                      <div key={`select-${idx}`} className="selection">
                        <div className="container">
                          <motion.h2 {...fadeInUp} className="size">
                            {option.name}
                          </motion.h2>
                          <select
                            className="select"
                            name={option.name}
                            size={5}
                          >
                            {option &&
                              option.values.map((value: Value, idx: number) => (
                                <option
                                  key={`selection-${idx}`}
                                  value={value.value}
                                >
                                  {value.value}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    );
                  case "button group":
                    return (
                      <div key={idx} className="button-group">
                        <h2 className="title">{option.name}</h2>
                        <div className="buttons-container">
                          {option &&
                            option.values.map((value: Value, idx: number) => (
                              <button
                                key={`button-${idx}`}
                                className="buttons-group-btns"
                                value={value.value}
                              >
                                {value.value}
                              </button>
                            ))}
                        </div>
                      </div>
                    );
                }
              })}
            <button
              className="buy-button"
              onClick={() => alert(`buy now clicked`)}
            >
              Buy Now
            </button>
            <ul className="details-ul">
              <div className="list">
                {product &&
                  product.details.map((bullet, idx) => (
                    <li className="item" key={`bullet=${idx}`}>
                      {bullet}
                    </li>
                  ))}
              </div>
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
