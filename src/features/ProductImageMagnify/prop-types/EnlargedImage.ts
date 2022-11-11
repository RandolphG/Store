import { ENLARGED_IMAGE_POSITION } from "../constants";
import { DefaultHint } from "../hint";
import Lens from "../lens/negative-space/Lens";
import { LargeImageShape, SmallImageShape } from "./Image";

export type EnlargedImagePosition =
  | ENLARGED_IMAGE_POSITION.beside
  | ENLARGED_IMAGE_POSITION.over;

export type EnlargedImageContainerDimensions = {
  width: number | string;
  height: number | string;
};

export type ContainerDimensions = {
  width: number;
  height: number;
};

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
  isPortalEnabledForTouch: boolean;
  isTouchDetected: boolean;
  portalId: string;
}
