import React from "react";
import { LensProps } from "../../prop-types/Lens";
import { clamp } from "../../utils";
import dataUri from "./assets/textured-lens-data-uri";

type composite = {
  backgroundImage: string;
  transition: string;
  top: string;
  left: string;
  width: string;
  position: string;
  opacity: number;
  height: string;
};

/**
 * PositiveSpaceLens
 * @param cursorOffset
 * @param position
 * @param fadeDurationInMs
 * @param isActive
 * @param isPositionOutside
 * @param smallImage
 * @param style
 * @return JSX.Element
 */
const PositiveSpaceLens = ({
  cursorOffset,
  position,
  fadeDurationInMs,
  isActive,
  isPositionOutside,
  smallImage,
  style,
}: LensProps) => {
  /**
   * getDimensions
   */
  const getDimensions = () => {
    return {
      width: cursorOffset.x * 2,
      height: cursorOffset.y * 2,
    };
  };

  const getPositionOffset = () => {
    const { width, height } = getDimensions();

    const top = position.y - cursorOffset.y;
    const left = position.x - cursorOffset.x;
    const maxTop = smallImage.height - height;
    const maxLeft = smallImage.width - width;
    const minOffset = 0;

    return {
      top: clamp(top, minOffset, maxTop),
      left: clamp(left, minOffset, maxLeft),
    };
  };

  const getDefaultStyle = () => {
    return {
      transition: `opacity ${fadeDurationInMs}ms ease-in`,
      backgroundImage: `url(${dataUri})`,
    };
  };

  const getUserSpecifiedStyle = () => {
    return style;
  };

  const getIsVisible = () => {
    return isActive && !isPositionOutside;
  };

  const getPriorityStyle = () => {
    const { width, height } = getDimensions();

    const { top, left } = getPositionOffset();

    return {
      position: "absolute",
      top: `${top}px`,
      left: `${left}px`,
      width: `${width}px`,
      height: `${height}px`,
      opacity: getIsVisible() ? 1 : 0,
    };
  };

  const getCompositeStyle = (): composite => {
    const composite = Object.assign(
      {},
      getUserSpecifiedStyle(),
      getDefaultStyle(),
      getPriorityStyle()
    );

    return composite;
  };

  /*
   * TS2559: Type '() => { transition: string; backgroundImage: string; } &
   * { position: string; top: string; left: string; width: string; height: string; opacity: number; }'
   * has no properties in common with type 'Properties<string | number, string & {}>'
   * */
  /*@ts-ignore*/
  return <div style={getCompositeStyle()} />;
};

export default PositiveSpaceLens;
