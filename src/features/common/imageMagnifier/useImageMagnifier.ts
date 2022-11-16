import { useEffect } from "react";

export const useImageMagnifier = () => {
  useEffect(() => {
    /**
     * parseHTML
     * @description most efficient way to add HTML, faster than innerHTML
     * @param htmlStr
     * @return DocumentFragment
     */
    const parseHTML = (htmlStr: string) => {
      const range = document.createRange();
      range.selectNode(document.body); // required in Safari
      return range.createContextualFragment(htmlStr);
    };

    /**
     * makeImgMagnified
     * @description pass this function any image element to add magnifying functionality
     * @param img
     * @return void
     */
    const makeImgMagnified = (img: HTMLImageElement) => {
      const magnifierFragment = parseHTML(`
    <div class="magnifier-container">
      <div class="magnifier">
        <img alt="magnifier" class="magnifier__img" src="${img.src}"/>
      </div>
    </div>
  `);

      /*This preserves the original element reference instead of cloning it.*/
      img.parentElement!.insertBefore(magnifierFragment, img);
      const magnifierContainerEl = document.querySelector(
        ".magnifier-container"
      );
      img.remove();
      magnifierContainerEl!.appendChild(img);

      /*query the DOM for the newly added elements*/
      const magnifierEl = magnifierContainerEl!.querySelector(".magnifier");
      const magnifierImg = magnifierEl!.querySelector(".magnifier__img");

      /*set up the transform object to be mutated as mouse events occur*/
      const transform = {
        translate: [0, 0],
        scale: 1,
      };

      /**
       * setTransformStyle
       * @description shortcut function to set the transform css property
       * @param el
       * @param translate
       * @param scale
       */
      const setTransformStyle = (el: any, { translate, scale }: any) => {
        const [xPercent, yRawPercent] = translate;
        const yPercent = yRawPercent < 0 ? 0 : yRawPercent;

        /*make manual pixel adjustments to better center
        the magnified area over the cursor.*/
        const [xOffset, yOffset] = [
          `calc(-${xPercent}% + 250px)`,
          `calc(-${yPercent}% + 70px)`,
        ];

        el.style = `
      transform: scale(${scale}) translate(${xOffset}, ${yOffset});
    `;
      };

      /**
       * handleMouseMove
       * @description show magnified thumbnail on hover
       * @param event
       * @return void
       */
      const handleMouseMove = (event: MouseEvent) => {
        console.log("MOVE");
        const [mouseX, mouseY] = [event.pageX + 40, event.pageY - 20];
        const { top, left, bottom, right } = img.getBoundingClientRect();
        transform.translate = [
          ((mouseX - left) / right) * 100,
          ((mouseY - top) / bottom) * 100,
        ];

        /*@ts-ignore*/
        magnifierEl.style = `
      display: block;
      top: ${mouseY}px;
      left: ${mouseX}px;
    `;
        setTransformStyle(magnifierImg, transform);
      };

      img.addEventListener("mousemove", handleMouseMove);

      /**
       * handleMouseWheel
       * @description zoom in/out with mouse wheel
       * @param event
       * @return void
       */
      const handleMouseWheel = (event: WheelEvent) => {
        console.log("WHEEL");
        event.preventDefault();
        const scrollingUp = event.deltaY < 0;
        const { scale } = transform;
        transform.scale =
          scrollingUp && scale < 3
            ? scale + 0.1
            : !scrollingUp && scale > 1
            ? scale - 0.1
            : scale;
        setTransformStyle(magnifierImg, transform);
      };

      img.addEventListener("wheel", handleMouseWheel);

      /**
       * handleMouseLeave
       * @description remove element
       * @return void
       */
      const handleMouseLeave = () => {
        /*@ts-ignore*/
        magnifierEl.style = "";
        /*@ts-ignore*/
        magnifierImg.style = "";
      };

      /*reset after mouse leaves*/
      img.addEventListener("mouseleave", handleMouseLeave);
    };

    const img = <HTMLImageElement>document.querySelector(".image-preview-js");
    // makeImgMagnified(reference.current);
    // makeImgMagnified(img);
  }, []);

  return {};
};
