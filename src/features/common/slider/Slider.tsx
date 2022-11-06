import React from "react";
import { useImageSlider } from "./useImageSlider";
import "./SliderStyles.scss";

const Slider = () => {
  const { product } = useImageSlider();
  return (
    <div>
      <div id="slider">
        <a className="control_next">{`>`}</a>
        <a className="control_prev">{"<"}</a>
        <ul id="slides">
          {product.images.map((img, idx) => {
            console.log("IMAGES", img);
            return (
              <li
                key={`slide -${idx}`}
                id="slide"
                style={{ background: "#aaa" }}
              >
                <img
                  alt="image-preview"
                  className="image-preview image-preview-js"
                  src="https://assets.petco.com/petco/image/upload/f_auto,q_auto/2668223-center-1"
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="slider_option">
        <input type="checkbox" id="checkbox" />
        <label htmlFor="checkbox">Autoplay Slider</label>
      </div>
    </div>
  );
};

export default Slider;
