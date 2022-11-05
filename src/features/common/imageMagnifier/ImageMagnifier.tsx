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
    <div className="imageContainer">
      <img
        alt="image-preview"
        className="image-preview image-preview-js"
        src="https://assets.petco.com/petco/image/upload/f_auto,q_auto/2668223-center-1"
      />
    </div>
  );
};

export default ImageMagnifier;
