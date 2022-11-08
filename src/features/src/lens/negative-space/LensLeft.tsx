import React from "react";
import { LensProps } from "../../prop-types/Lens";
import { clamp } from "../../utils";
import Lens from "./Lens";

/**
 * LensLeft
 * @param cursorOffset
 * @param position
 * @param fadeDurationInMs
 * @param isActive
 * @param isPositionOutside
 * @param smallImage
 * @param parentSpecifiedStyle
 * @return JSX.Element
 */
const LensLeft = ({
  cursorOffset,
  position,
  fadeDurationInMs,
  isActive,
  isPositionOutside,
  smallImage,
  style: parentSpecifiedStyle,
}: LensProps) => {
  const clearLensHeight = cursorOffset.y * 2;
  const clearLensWidth = cursorOffset.x * 2;
  const maxHeight = smallImage.height - clearLensHeight;
  const maxWidth = smallImage.width - clearLensWidth;
  const height = clearLensHeight;
  const width = clamp(position.x - cursorOffset.x, 0, maxWidth);
  const top = clamp(position.y - cursorOffset.y, 0, maxHeight);
  const computedStyle = {
    height: `${height}px`,
    width: `${width}px`,
    top: `${top}px`,
    left: "0px",
  };

  return (
    <Lens
      {...{
        fadeDurationInMs,
        isActive,
        isPositionOutside,
        style: Object.assign({}, parentSpecifiedStyle, computedStyle),
      }}
    />
  );
};

export default LensLeft;
