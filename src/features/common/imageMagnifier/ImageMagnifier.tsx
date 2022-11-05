import React from "react";
import "./ImageMagnifierStyles.scss";
import { useImageMagnifier } from "./useImageMagnifier";
/**
 * ImageMagnifier
 * @description magnify targeted image
 */
const ImageMagnifier = () => {
  useImageMagnifier();
  return (
    <>
      <div id="container">
        <div className="image">
          <img
            className="selectedImg"
            alt="image"
            src="https://images-na.ssl-images-amazon.com/images/I/614RBksGdwL._AC_SX425_.jpg"
          />
        </div>
      </div>
      <div className="loupe" />
    </>
  );
};

export default ImageMagnifier;
