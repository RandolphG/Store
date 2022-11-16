import {
  ContainerDimensions,
  coordinates,
  LargeImageShape,
  SmallImageShape,
  minCoordinates,
  maxCoordinates,
  Point,
} from "../prop-types";
import { clamp } from "../utils";
import {
  getContainerToImageRatio,
  getSmallToLargeImageRatio,
} from "./imageRatio";

/**
 * getMinCoordinates
 * @param container
 * @param largeImage
 */
function getMinCoordinates(
  container: ContainerDimensions,
  largeImage: LargeImageShape
) {
  return {
    x: (largeImage.width - container.width) * -1,
    y: (largeImage.height - container.height) * -1,
  };
}

/**
 * getMaxCoordinates
 * @return {x: number y: number}
 */
function getMaxCoordinates() {
  return {
    x: 0,
    y: 0,
  };
}

/**
 * getLensModeEnlargedImageCoordinates
 * @param containerDimensions
 * @param lensCursorOffset
 * @param largeImage
 * @param position
 * @param smallImage
 */
export function getLensModeEnlargedImageCoordinates({
  containerDimensions,
  cursorOffset: lensCursorOffset,
  largeImage,
  position,
  smallImage,
}: {
  containerDimensions: ContainerDimensions;
  cursorOffset: Point;
  largeImage: LargeImageShape;
  position: Point;
  smallImage: SmallImageShape;
}) {
  const adjustedPosition = getCursorPositionAdjustedForLens(
    position,
    lensCursorOffset
  );
  const ratio = getSmallToLargeImageRatio(smallImage, largeImage);
  const coordinates = {
    x: Math.round(adjustedPosition.x * ratio.x) * -1,
    y: Math.round(adjustedPosition.y * ratio.y) * -1,
  };
  const minCoordinates = getMinCoordinates(containerDimensions, largeImage);
  const maxCoordinates = getMaxCoordinates();

  return clampImageCoordinates(coordinates, minCoordinates, maxCoordinates);
}

/**
 * getInPlaceEnlargedImageCoordinates
 * @param containerDimensions
 * @param largeImage
 * @param position
 */
export function getInPlaceEnlargedImageCoordinates({
  containerDimensions,
  largeImage,
  position,
}: {
  containerDimensions: ContainerDimensions;
  largeImage: LargeImageShape;
  position: Point;
}) {
  const minCoordinates = getMinCoordinates(containerDimensions, largeImage);
  const maxCoordinates = getMaxCoordinates();
  const ratio = getContainerToImageRatio(containerDimensions, largeImage);
  const coordinates = {
    x: Math.round(position.x * ratio.x) * -1,
    y: Math.round(position.y * ratio.y) * -1,
  };

  return clampImageCoordinates(coordinates, minCoordinates, maxCoordinates);
}

/**
 * clampImageCoordinates
 * @param imageCoordinates
 * @param minCoordinates
 * @param maxCoordinates
 */
function clampImageCoordinates(
  imageCoordinates: coordinates,
  minCoordinates: minCoordinates,
  maxCoordinates: maxCoordinates
) {
  return {
    x: clamp(imageCoordinates.x, minCoordinates.x, maxCoordinates.x),
    y: clamp(imageCoordinates.y, minCoordinates.y, maxCoordinates.y),
  };
}

/**
 * getCursorPositionAdjustedForLens
 * @param position
 * @param lensCursorOffset
 */
function getCursorPositionAdjustedForLens(
  position: Point,
  lensCursorOffset: Point
) {
  return {
    x: position.x - lensCursorOffset.x,
    y: position.y - lensCursorOffset.y,
  };
}
