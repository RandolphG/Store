import { ContainerDimensions } from "../prop-types/EnlargedImage";
import { LargeImageShape, SmallImageShape } from "../prop-types/Image";

/**
 * getSmallToLargeImageRatio
 * @param smallImage
 * @param largeImage
 */
export function getSmallToLargeImageRatio(
  smallImage: SmallImageShape,
  largeImage: LargeImageShape
) {
  return getSmallToLargeElementRatio(smallImage, largeImage);
}

/**
 * getLargeToSmallImageRatio
 * @param smallImage
 * @param largeImage
 */
export function getLargeToSmallImageRatio(
  smallImage: SmallImageShape,
  largeImage: LargeImageShape
) {
  return {
    x: smallImage.width / largeImage.width,
    y: smallImage.height / largeImage.height,
  };
}

/**
 * getContainerToImageRatio
 * @param container
 * @param image
 */
export function getContainerToImageRatio(
  container: ContainerDimensions,
  image: LargeImageShape
) {
  return getSmallToLargeElementRatio(container, {
    ...image,
    width: image.width - container.width,
    height: image.height - container.height,
  });
}

/**
 * getSmallToLargeElementRatio
 * @param smallElement
 * @param largeElement
 */
function getSmallToLargeElementRatio(
  smallElement: SmallImageShape | ContainerDimensions,
  largeElement: LargeImageShape
) {
  return {
    x: largeElement.width / smallElement.width,
    y: largeElement.height / smallElement.height,
  };
}
