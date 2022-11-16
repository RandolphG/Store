import React, { forwardRef } from "react";
import { ImageMagnifier } from "../imageMagnifier";
import { useImageSlider } from "./useImageSlider";
import "./SliderStyles.scss";

const Slider = ({
  reference,
  handleOnMove,
  handleMouseEnter,
  handleMouseLeave,
}: any) => {
  const { product } = useImageSlider();

  const SliderImage = forwardRef((props, reference) => (
    <img /*@ts-ignore*/
      ref={reference}
      {...props}
      alt="image-preview"
      className="image-preview image-preview-js"
      src="https://assets.petco.com/petco/image/upload/f_auto,q_auto/2668223-center-1"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleOnMove}
      onMouseLeave={handleMouseLeave}
    />
  ));

  return (
    <div>
      <div id="slider">
        <a className="control_next">{`>`}</a>
        <a className="control_prev">{"<"}</a>
        <ul id="slides">
          {product.images.map((img, idx) => {
            return (
              <li
                key={`slide -${idx}`}
                id="slide"
                style={{ background: "#aaa" }}
              >
                <SliderImage ref={reference} />
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
