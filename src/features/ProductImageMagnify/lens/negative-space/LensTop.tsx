import React from "react";
import Lens from "./Lens";
import { LensProps } from "../../prop-types/Lens";

/**
 * LensTop
 * @param cursorOffset
 * @param position
 * @param fadeDurationInMs
 * @param isActive
 * @param isPositionOutside
 * @param smallImage
 * @param parentSpecifiedStyle
 * @return JSX.Element
 */
const LensTop = ({
  cursorOffset,
  position,
  fadeDurationInMs,
  isActive,
  isPositionOutside,
  smallImage,
  style: parentSpecifiedStyle,
}: LensProps) => {
  const clearLensHeight = cursorOffset.y * 2;
  const maxHeight = smallImage.height - clearLensHeight;
  const height = clamp(position.y - cursorOffset.y, 0, maxHeight);
  const computedStyle = {
    height: `${height}px`,
    width: "100%",
    top: "0px",
  };

  /* limit the position to specific area */
  function clamp(a: number, min: number, max: number) {
    min > a ? (a = min) : a > max && (a = max);
    return a;
  }

  return (
    <Lens
      fadeDurationInMs={fadeDurationInMs}
      isActive={isActive}
      isPositionOutside={isPositionOutside}
      style={Object.assign({}, parentSpecifiedStyle, computedStyle)}
    />
  );
};

export default LensTop;
