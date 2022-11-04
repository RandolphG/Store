import React, { useEffect } from "react";
import "./SliderStyles.scss";

const Slider = () => {
  useEffect(() => {
    const checkbox = document.getElementById("checkbox");
    const controlNext = document.querySelector(".control_next");
    const controlPrev = document.querySelector(".control_prev");
    const slides = document.getElementById("slides");
    const slide = document.getElementById("slide");
    const slideCount: number = slides!.children.length;
    /*@ts-ignore*/
    const slideWidth = getComputedStyle(slide).width;
    const sliderUIWidth = slideCount * parseInt(slideWidth);

    if (controlNext && controlPrev && checkbox) {
      controlNext.addEventListener("click", moveRight);
      controlPrev.addEventListener("click", moveLeft);
    }

    if (checkbox) {
      checkbox.addEventListener("change", () => {
        console.log("CHANGED");
        autoSlide();
      });
    }

    if (slides) {
      slides.style.width = String(sliderUIWidth);
      slides.style.marginLeft = String(-slideWidth);
    }

    function moveLeft() {
      console.log("MOVE_LEFT");
      slides!.animate({ left: +slideWidth }, { duration: 300, iterations: 1 });
      const lastChild = slides!.lastChild;
      slides!.prepend(lastChild!);
      slides!.style.left = "";
    }

    function moveRight() {
      console.log("MOVE_RIGHT");
      slides!.animate({ left: -slideWidth }, { duration: 300, iterations: 1 });
      const firstChild = slides!.firstChild;
      slides!.append(firstChild!);
      slides!.style.left = "";
    }

    function autoSlide() {
      setInterval(function () {
        console.log("AUTO_SLIDE");
        moveRight();
      }, 3000);
    }
  }, []);

  return (
    <div>
      <div id="slider">
        <a className="control_next">{`>`}</a>
        <a className="control_prev">{"<"}</a>
        <ul id="slides">
          <li id="slide">SLIDE 1</li>
          <li style={{ background: "#aaa" }}>SLIDE 2</li>
          <li>SLIDE 3</li>
          <li style={{ background: "#aaa" }}>SLIDE 4</li>
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
