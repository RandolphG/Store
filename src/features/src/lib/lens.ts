import { EnlargedImageContainerDimensions } from "../prop-types/EnlargedImage";
import { LargeImageShape, SmallImageShape } from "../prop-types/Image";
import { getLargeToSmallImageRatio } from "./imageRatio";

/**
 * getLensCursorOffset
 * @param smallImage
 * @param largeImage
 * @param enlargedImageContainerDimensions
 */
export function getLensCursorOffset(
  smallImage: SmallImageShape,
  largeImage: LargeImageShape,
  enlargedImageContainerDimensions: EnlargedImageContainerDimensions
) {
  const ratio = getLargeToSmallImageRatio(smallImage, largeImage);
  return {
    x: getLensCursorOffsetDimension(
      enlargedImageContainerDimensions.width as number,
      ratio.x
    ),
    y: getLensCursorOffsetDimension(
      enlargedImageContainerDimensions.height as number,
      ratio.y
    ),
  };
}

/**
 * getLensCursorOffsetDimension
 * @param enlargedImageContainerDimension
 * @param ratio
 * @return {number}
 */
function getLensCursorOffsetDimension(
  enlargedImageContainerDimension: number,
  ratio: number
) {
  return Math.round((enlargedImageContainerDimension * ratio) / 2);
}
