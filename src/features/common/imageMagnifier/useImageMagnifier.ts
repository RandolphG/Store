import $ from "jquery";
import { useEffect } from "react";

export const useImageMagnifier = () => {
  useEffect(() => {
    const loupe = document.querySelector(".loupe");
    const loupeWidth = getComputedStyle(loupe!).width;
    const loupeHeight = getComputedStyle(loupe!).height;
    /*@ts-ignore*/
    const loupeOffsetTop = loupe.offsetTop;
    /*@ts-ignore*/
    const loupeOffsetLeft = loupe.offsetLeft;

    const container = document.querySelector("img");
    if (container) {
      /*@ts-ignore*/
      container.addEventListener("mouseenter", handleMouseEnter);
      /*@ts-ignore*/
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    /**
     * handleMouseLeave
     */
    function handleMouseLeave() {
      fadeOut(loupe);
    }

    /**
     * handleMouseEnter
     * @param {MouseEvent} event
     */
    function handleMouseEnter(event: MouseEvent) {
      // document.addEventListener("mousemove", handleMouseMove);
      if (container) {
        /*@ts-ignore*/
        container.addEventListener("mousemove", handleMouseMove);
      }

      let loaded: boolean = false;
      const currImage: EventTarget | null = event.target;
      /*@ts-ignore*/
      const currImageSrc = currImage.currentSrc;
      /*@ts-ignore*/
      const currImageWidth = event.target.clientWidth;
      /*@ts-ignore*/
      const currImageHeight = event.target.clientHeight;

      console.log("\n%cEVENT_MOUSE_ENTER :", "background:black;color:yellow;");
      console.log("%cEVENT :", "background:black;color:orange;", event);
      console.log(
        "%cCURRENT_IMAGE :",
        "background:black;color:lightblue;" /*@ts-ignore*/,
        currImage
      );
      console.log(
        "%cIMAGE_SRC :",
        "background:black;color:pink;" /*@ts-ignore*/,
        currImageSrc,
        "\n\tWIDTH :",
        currImageHeight,
        "\n\tHEIGHT :",
        currImageWidth
      );

      const newImage = new Image();
      newImage.src = currImageSrc;
      newImage.onload = (img) => {
        loaded = true;
        /*@ts-ignore*/
        img.target!.width = currImageWidth * 2;
        /*@ts-ignore*/
        img.target!.height = currImageHeight * 2;
        /*@ts-ignore*/
      };

      fadeIn(loupe);

      /**
       * handleMouseMove
       * @param {MouseEvent} event
       * @return void
       */
      function handleMouseMove(event: MouseEvent) {
        console.log("EVENT", event);
        const currImage: EventTarget | null = event.target;
        /*@ts-ignore*/
        const currImageOffsetTop = currImage.offsetTop;
        /*@ts-ignore*/
        const currImageOffsetLeft = currImage.offsetLeft;

        /*@ts-ignore*/
        const fx: number = currImageOffsetLeft - parseInt(loupeWidth) / 2;
        /*@ts-ignore*/
        const fy: number = currImageOffsetTop - parseInt(loupeHeight) / 2;
        const fh: number =
          /*@ts-ignore*/
          currImageOffsetTop + currImageHeight + parseInt(loupeHeight) / 2;
        /*@ts-ignore*/
        const fw =
          currImageOffsetLeft + currImageWidth + parseInt(loupeWidth) / 2;

        /*@ts-ignore*/
        loupe.style.left = event.pageX - 75;
        /*@ts-ignore*/
        loupe.style.top = event.pageY - 75;

        const lx = loupeOffsetLeft;
        const ly = loupeOffsetTop;
        const lw = lx + parseInt(loupeWidth);
        const lh = ly + parseInt(loupeHeight);
        const bigy = (ly - parseInt(loupeHeight) / 4 - fy) * 2;
        const bigx = (lx - parseInt(loupeWidth) / 4 - fx) * 2;

        newImage.style.left = String(-bigx);
        if (lx < fx || lh > fh || ly < fy || lw > fw) {
          console.log("TRUE");
          newImage.remove();
          /*@ts-ignore*/
          container.removeEventListener("mousemove", handleMouseMove);
          // $loupe.fadeOut(100);
        }
      }
    }

    /*
    const $loupe = $(".loupe");
    const loupeWidth = $loupe.width();
    const loupeHeight = $loupe.height();

    $(document).on("mouseenter", ".image", function (e) {
      const $currImage = $(this);
      const $img = $("<img/>")
        .attr("src", $("img", this).attr("src"))
        .css({
          width: $currImage.width() * 2,
          height: $currImage.height() * 2,
        });

      $loupe.html($img).fadeIn(100);

      $(document).on("mousemove", moveHandler);

      function moveHandler(e: any) {
        const imageOffset = $currImage.offset();
        const fx = imageOffset.left - loupeWidth / 2;
        const fy = imageOffset.top - loupeHeight / 2;
        const fh = imageOffset.top + $currImage.height() + loupeHeight / 2;
        const fw = imageOffset.left + $currImage.width() + loupeWidth / 2;

        $loupe.css({
          left: e.pageX - 75,
          top: e.pageY - 75,
        });

        const loupeOffset = $loupe.offset();
        const lx = loupeOffset.left;
        const ly = loupeOffset.top;
        const lw = lx + loupeWidth;
        const lh = ly + loupeHeight;
        const bigy = (ly - loupeHeight / 4 - fy) * 2;
        const bigx = (lx - loupeWidth / 4 - fx) * 2;

        $img.css({ left: -bigx, top: -bigy });

        if (lx < fx || lh > fh || ly < fy || lw > fw) {
          $img.remove();
          $(document).off("mousemove", moveHandler);
          $loupe.fadeOut(100);
        }
      }
    });*/

    /**
     * resizeImg
     * @param img
     * @param height
     * @param width
     * @param scale
     * @return void
     * https://stackoverflow.com/questions/1297449/change-image-size-with-javascript
     */
    function resizeImg(
      img: HTMLImageElement,
      height: number,
      width: number,
      scale: number = 1
    ) {
      if (height && width) {
        img.height = parseInt(String(scale * height));
        img.width = parseInt(String(scale * width));
      }
    }

    /**
     * fadeIn
     * @param element
     * @return void
     */
    function fadeIn(element: any) {
      let opacity = 0.1; // initial opacity
      element.style.display = "block";
      let timer = setInterval(function () {
        if (opacity >= 1) {
          clearInterval(timer);
        }
        element.style.opacity = opacity;
        element.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        opacity += opacity * 0.1;
      }, 5);
    }

    /**
     * fadeOut
     * @param element
     */
    function fadeOut(element: any) {
      let opacity = 1; // initial opacity
      let timer = setInterval(function () {
        if (opacity <= 0.1) {
          clearInterval(timer);
          element.style.display = "none";
        }
        element.style.opacity = opacity;
        element.style.filter = "alpha(opacity=" + opacity * 100 + ")";
        opacity -= opacity * 0.1;
      }, 50);
    }
  });

  return {};
};
