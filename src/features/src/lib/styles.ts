import {
  ContainerDimensions,
  EnlargedImageContainerStyleCache,
  imageCoordinates,
  LargeImageShape,
  SmallImageShape,
} from "../prop-types/";
import { isEqual } from "../utils/isEqual";

/**
 * getContainerStyle
 * @param smallImage
 * @param userSpecifiedStyle
 */
export function getContainerStyle(
  smallImage: SmallImageShape,
  userSpecifiedStyle: {}
) {
  const { isFluidWidth: isSmallImageFluidWidth, width, height } = smallImage;

  const fluidWidthContainerStyle = {
    width: "auto",
    height: "auto",
    fontSize: "0px",
    position: "relative",
  };

  const fixedWidthContainerStyle = {
    width: `${width}px`,
    height: `${height}px`,
    position: "relative",
  };

  const priorityContainerStyle = isSmallImageFluidWidth
    ? fluidWidthContainerStyle
    : fixedWidthContainerStyle;

  return Object.assign(
    { cursor: "crosshair" },
    userSpecifiedStyle,
    priorityContainerStyle
  );
}

/**
 * getSmallImageStyle
 * @param smallImage
 * @param style
 */
export function getSmallImageStyle(smallImage: SmallImageShape, style: {}) {
  const { isFluidWidth: isSmallImageFluidWidth, width, height } = smallImage;

  const fluidWidthSmallImageStyle = {
    width: "100%",
    height: "auto",
    display: "block",
    pointerEvents: "none",
  };

  const fixedWidthSmallImageStyle = {
    width: `${width}px`,
    height: `${height}px`,
    pointerEvents: "none",
  };

  const prioritySmallImageStyle = isSmallImageFluidWidth
    ? fluidWidthSmallImageStyle
    : fixedWidthSmallImageStyle;

  return Object.assign({}, style, prioritySmallImageStyle);
}

/**
 * getPrimaryEnlargedImageContainerStyle
 * @param isInPlaceMode
 * @param isPortalRendered
 */
function getPrimaryEnlargedImageContainerStyle(
  isInPlaceMode: boolean,
  isPortalRendered: boolean
) {
  const baseContainerStyle = {
    overflow: "hidden",
  };

  if (isPortalRendered) {
    return baseContainerStyle;
  }

  const sharedPositionStyle = {
    position: "absolute",
    top: "0px",
  };

  if (isInPlaceMode) {
    return Object.assign(baseContainerStyle, sharedPositionStyle, {
      left: "0px",
    });
  }

  return Object.assign(baseContainerStyle, sharedPositionStyle, {
    left: "100%",
    marginLeft: "10px",
    border: "1px solid #d6d6d6",
  });
}

/**
 *getPriorityEnlargedImageContainerStyle
 * @param params
 */
function getPriorityEnlargedImageContainerStyle(params: {
  containerDimensions: ContainerDimensions;
  fadeDurationInMs: number;
  isTransitionActive: boolean;
}) {
  const { containerDimensions, fadeDurationInMs, isTransitionActive } = params;

  return {
    width: containerDimensions.width,
    height: containerDimensions.height,
    opacity: isTransitionActive ? 1 : 0,
    transition: `opacity ${fadeDurationInMs}ms ease-in`,
    pointerEvents: "none",
  };
}

const enlargedImageContainerStyleCache: EnlargedImageContainerStyleCache = {
  params: {},
  compositeStyle: {},
};

/**
 * getEnlargedImageContainerStyle
 * @param params
 */
export function getEnlargedImageContainerStyle(params: {
  containerDimensions: ContainerDimensions;
  containerStyle: {};
  fadeDurationInMs: number;
  isTransitionActive: boolean;
  isInPlaceMode: boolean;
  isPortalRendered: boolean;
}) {
  const cache = enlargedImageContainerStyleCache;
  const { params: memoizedParams = {}, compositeStyle: memoizedStyle } = cache;

  if (isEqual(memoizedParams, params)) {
    return memoizedStyle;
  }

  const {
    containerDimensions,
    containerStyle: userSpecifiedStyle,
    fadeDurationInMs,
    isTransitionActive,
    isInPlaceMode,
    isPortalRendered,
  } = params;

  const primaryStyle = getPrimaryEnlargedImageContainerStyle(
    isInPlaceMode,
    isPortalRendered
  );
  const priorityStyle = getPriorityEnlargedImageContainerStyle({
    containerDimensions,
    fadeDurationInMs,
    isTransitionActive,
  });

  cache.compositeStyle = Object.assign(
    {},
    primaryStyle,
    userSpecifiedStyle,
    priorityStyle
  );
  cache.params = params;

  return cache.compositeStyle;
}

/**
 *
 * @param params
 */
export function getEnlargedImageStyle(params: {
  imageCoordinates: imageCoordinates;
  imageStyle: {};
  largeImage: LargeImageShape;
}) {
  const {
    imageCoordinates,
    imageStyle: userSpecifiedStyle,
    largeImage,
  } = params;

  const translate = `translate(${imageCoordinates.x}px, ${imageCoordinates.y}px)`;

  const priorityStyle = {
    width: largeImage.width,
    height: largeImage.height,
    transform: translate,
    WebkitTransform: translate,
    msTransform: translate,
    pointerEvents: "none",
  };

  return Object.assign({}, userSpecifiedStyle, priorityStyle);
}
