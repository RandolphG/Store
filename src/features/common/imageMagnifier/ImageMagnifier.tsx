import React, {
  CSSProperties,
  forwardRef,
  ReactPortal,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./ImageMagnifierStyles.scss";
import { createPortal } from "react-dom";
import { Slider } from "../slider";

type props = {
  children: JSX.Element | JSX.Element[];
};

type transform = { translate: number[]; scale: number };

/*set up the transform object to be mutated as mouse events occur*/
const transform: transform = {
  translate: [0, 0],
  scale: 1,
};

type RectResult = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};

/**
 * ImageMagnifier
 * @description magnify targeted image
 */
const ImageMagnifier = () => {
  const imageReference = useRef<HTMLImageElement>(null);
  const magnifierReference = useRef<HTMLImageElement>(null);
  const [image, setImage] = useState<any>(null);
  const [magnifierImg, setMagnifierImg] = useState<any>(null);
  const [magnifierStyle, setMagnifierStyle] = useState<any>({});
  const [magnifierImgStyle, setMagnifierImgStyle] = useState<any>({});

  useEffect(() => {
    if (imageReference && imageReference.current) {
      setImage(imageReference.current);
      setMagnifierImg(imageReference.current.src);

      showLog("Image Reference", imageReference.current);
      showLog("Image Source", imageReference.current.src);
    }
    if (magnifierReference && magnifierReference.current) {
      showLog("Magnifier", magnifierReference.current);
    }
  }, []);

  const showLog = (
    title: string,
    reference?:
      | HTMLImageElement
      | MouseEvent
      | RectResult
      | RefObject<any>
      | transform
      | string
      | number
      | null
  ) => {
    console.log(
      `\n%c ${title} `,
      "margin-top:4px;color:white;border:solid 2px white;border-radius:4px;background:black;",
      reference ? reference : ""
    );
  };

  /**
   * magnifierFragment
   *  CSSStyleDeclaration*
   */
  const MagnifierFragment = forwardRef(
    (
      props: {
        src: string;
        magnifier: { style: CSSProperties };
        magnifierImg: { style: CSSProperties };
      },
      reference
    ): ReactPortal => {
      return createPortal(
        <div className="magnifier-container">
          <div className="magnifier" style={props.magnifier.style}>
            <img /*@ts-ignore*/
              ref={reference}
              src={props.src}
              style={props.magnifierImg.style}
              alt="magnifier"
              className="magnifier__img"
            />
          </div>
        </div>,
        document.getElementById("magnify") as Element | DocumentFragment
      );
    }
  );

  /**
   * setTransformStyle
   * @description shortcut function to set the transform css property
   * @param element
   * @param translate
   * @param scale
   */
  const setTransformStyle = (
    element: RefObject<HTMLImageElement>,
    { translate, scale }: transform
  ) => {
    showLog("setTransformStyle");
    const [xPercent, yRawPercent] = translate;
    const yPercent = yRawPercent < 0 ? 0 : yRawPercent;

    /*make manual pixel adjustments to better center
       the magnified area over the cursor.*/
    const [xOffset, yOffset] = [
      `calc(-${xPercent}% + 250px)`,
      `calc(-${yPercent}% + 70px)`,
    ];

    setMagnifierImgStyle({
      transform: `scale(${scale}) translate(${xOffset}, ${yOffset});`,
    });
  };

  const handleOnMouseEnter = () => {
    showLog("handleOnMouseEnter");
  };

  /**
   * handleMouseMove
   * @description show magnified thumbnail on hover
   * @param event
   * @return void
   */
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const [mouseX, mouseY] = [event.pageX + 40, event.pageY - 20];

      if (imageReference && imageReference.current) {
        const { top, left, bottom, right } = getRect(imageReference.current);
        transform.translate = [
          ((mouseX - left) / right) * 100,
          ((mouseY - top) / bottom) * 100,
        ];

        setMagnifierStyle({
          display: "block",
          top: `${mouseY}px`,
          left: `${mouseX}px`,
        });

        setTransformStyle(imageReference, transform);
      } else {
        getRect();
      }
    },
    [imageReference]
  );

  /**
   * getRect
   * @param element
   * @return RectResult
   */
  function getRect<T extends HTMLImageElement>(element?: T): RectResult {
    let rect: RectResult = {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    };

    if (element) {
      rect = element.getBoundingClientRect();
    }

    return rect;
  }

  /**
   * handleMouseWheel
   * @description zoom in/out with mouse wheel
   * @param event
   * @return void
   */
  const handleMouseWheel = (event: WheelEvent) => {
    console.log("WHEEL");
    event.preventDefault();
  };

  /**
   * handleMouseLeave
   * @description remove element
   * @return void
   */
  const handleMouseLeave = () => {
    setMagnifierStyle({ display: "none" });
  };

  return (
    <div className="imageContainer">
      <Slider
        reference={imageReference}
        handleOnMove={handleMouseMove}
        handleMouseEnter={handleOnMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <MagnifierFragment
        ref={magnifierReference}
        src={magnifierImg}
        magnifier={magnifierStyle}
        magnifierImg={magnifierImgStyle}
      />
    </div>
  );
};

export default ImageMagnifier;
