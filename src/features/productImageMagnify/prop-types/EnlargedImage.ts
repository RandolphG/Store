import { ENLARGED_IMAGE_POSITION } from "../constants";
import { DefaultHint } from "../hint";
import Lens from "../lens/negative-space/Lens";
import { LargeImageShape, SmallImageShape } from "./Image";
import { Point } from "./Point";

export type EnlargedImagePosition =
  | ENLARGED_IMAGE_POSITION.beside
  | ENLARGED_IMAGE_POSITION.over;

export type EnlargedImageContainerDimensions = {
  width: number;
  height: number;
};

export type ContainerDimensions = {
  width: number;
  height: number;
};

export interface Transition {
  isTransitionEntering: boolean;
  isTransitionActive: boolean;
  isTransitionLeaving: boolean;
  isTransitionDone: boolean;
}

export interface ReactImageMagnifyProps {
  className: string;
  style: {};
  hoverDelayInMs: number;
  hoverOffDelayInMs: number;
  fadeDurationInMs: number;
  pressDuration: number;
  pressMoveThreshold: number;
  isActivatedOnTouch: boolean;
  imageClassName: string;
  imageStyle: {};
  lensStyle: {};
  lensComponent: typeof Lens;
  shouldUsePositiveSpaceLens: boolean;
  smallImage: SmallImageShape;
  largeImage: LargeImageShape;
  enlargedImageContainerClassName: string;
  enlargedImageContainerStyle: {};
  enlargedImageClassName: string;
  enlargedImageStyle: {};
  enlargedImageContainerDimensions: EnlargedImageContainerDimensions;
  enlargedImagePosition: EnlargedImagePosition;
  enlargedImagePortalId: string;
  isEnlargedImagePortalEnabledForTouch: boolean;
  hintComponent: typeof DefaultHint;
  hintTextMouse: string;
  hintTextTouch: string;
  isHintEnabled: boolean;
  shouldHideHintAfterFirstActivation: boolean;
}

export interface RenderEnlargedImageProps {
  containerClassName: string;
  containerDimensions: ContainerDimensions;
  cursorOffset: Point;
  containerStyle: {};
  fadeDurationInMs: number;
  imageClassName: string;
  imageStyle: {};
  isPortalEnabledForTouch: boolean;
  isTouchDetected: boolean;
  largeImage: LargeImageShape;
  smallImage: SmallImageShape;
  portalId: string;
  isInPlaceMode: boolean;
}

export interface EnlargedImageProps {
  containerClassName: string;
  containerStyle: {};
  cursorOffset: Point;
  position: Point;
  fadeDurationInMs: number;
  imageClassName: string;
  imageStyle: {};
  isActive: boolean;
  isLazyLoaded: boolean;
  largeImage: LargeImageShape;
  smallImage: SmallImageShape;
  containerDimensions: ContainerDimensions;
  isPortalRendered: boolean;
  isInPlaceMode: boolean;
  isPositionOutside: boolean;
}
