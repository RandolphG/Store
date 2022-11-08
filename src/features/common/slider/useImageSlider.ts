import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectProductDetail } from "../../productDetails";

/**
 *
 */
export const useImageSlider = () => {
  const { product } = useSelector(selectProductDetail);

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
        autoSlide();
      });
    }

    if (slides) {
      slides.style.width = String(sliderUIWidth);
      slides.style.marginLeft = String(-slideWidth);
    }

    /**
     * moveLeft
     * @return void
     */
    function moveLeft() {
      slides!.animate({ left: +slideWidth }, { duration: 300, iterations: 1 });
      const lastChild = slides!.lastChild;
      slides!.prepend(lastChild!);
      slides!.style.left = "";
    }

    /**
     * moveRight
     * @return void
     */
    function moveRight() {
      slides!.animate({ left: -slideWidth }, { duration: 300, iterations: 1 });
      const firstChild = slides!.firstChild;
      slides!.append(firstChild!);
      slides!.style.left = "";
    }

    /**
     * autoSlide
     * @return void
     */
    function autoSlide() {
      setInterval(function () {
        moveRight();
      }, 3000);
    }
  }, []);

  return { product };
};
