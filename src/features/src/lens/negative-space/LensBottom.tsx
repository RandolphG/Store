import React from "react";
import { clamp } from "../../utils";
import Lens from "./Lens";
import { LensProps } from "../../prop-types/Lens";
/*


*/

/**
 * LensBottom
 * @param cursorOffset
 * @param position
 * @param fadeDurationInMs
 * @param isActive
 * @param isPositionOutside
 * @param smallImage
 * @param parentSpecifiedStyle
 * @return JSX.Element
 */
const LensBottom = ({
  cursorOffset,
  position,
  fadeDurationInMs,
  isActive,
  isPositionOutside,
  smallImage,
  style: parentSpecifiedStyle,
}: LensProps) => {
  const clearLensHeight = cursorOffset.y * 2;
  const computedHeight = smallImage.height - position.y - cursorOffset.y;
  const maxHeight = smallImage.height - clearLensHeight;
  const height = clamp(computedHeight, 0, maxHeight);
  const clearLensBottom = position.y + cursorOffset.y;
  const top = Math.max(clearLensBottom, clearLensHeight);
  const computedStyle = {
    height: `${height}px`,
    width: "100%",
    top: `${top}px`,
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

export default LensBottom;
