import React, { FC, useEffect, useRef, useState } from "react";
import ReactCursorPosition from "react-cursor-position";
import { useReactImageMagnify } from "./useReactImageMagnify";
import { primaryInput } from "./utils/detectIt";
import RenderEnlargedImage from "./RenderEnlargedImage";
import NegativeSpaceLens from "./lens/negative-space";
import PositiveSpaceLens from "./lens/positive-space";
import DisplayUntilActive from "./hint/DisplayUntilActive";
import Hint from "./hint/DefaultHint";
import {
  getContainerStyle,
  getSmallImageStyle,
  getLensCursorOffset,
  getEnlargedImageContainerDimension,
} from "./lib";
import {
  EnlargedImagePosition,
  EnlargedImageContainerDimensions,
  LargeImageShape,
  SmallImageShape,
} from "./prop-types/";
import { noop } from "./utils";
import { INPUT_TYPE, ENLARGED_IMAGE_POSITION } from "./constants";

export interface Props {
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
  lensComponent: () => void;
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
  hintComponent: FC<{
    isTouchDetected: boolean;
    hintTextMouse: string;
    hintTextTouch: string;
  }>;
  hintTextMouse: string;
  hintTextTouch: string;
  isHintEnabled: boolean;
  shouldHideHintAfterFirstActivation: boolean;
}

/**
 * ReactImageMagnify
 * @param props
 * @constructor
 */
const ReactImageMagnify = (props: Props) => {
  useReactImageMagnify(props);
  return (
    <ReactCursorPosition
      className={props.className}
      hoverDelayInMs={props.hoverDelayInMs}
      hoverOffDelayInMs={props.hoverOffDelayInMs}
      isActivatedOnTouch={props.isActivatedOnTouch}
      onDetectedInputTypeChanged={onDetectedInputTypeChanged}
      pressDuration={props.pressDuration}
      pressMoveThreshold={props.pressMoveThreshold}
      shouldStopTouchMovePropagation={true}
      style={getContainerStyle(props.smallImage, props.style)}
    >
      <img
        src={props.smallImage.src}
        srcSet={props.smallImage.srcSet}
        sizes={props.smallImage.sizes}
        alt={props.smallImage.alt}
        className={props.imageClassName}
        style={getSmallImageStyle(props.smallImage, props.imageStyle)}
        /*TODO needs an image reference */
        ref={(el) => (imageReference = el)}
        onLoad={onSmallImageLoad}
        onError={() => {}}
      />
      {props.isHintEnabled && (
        <DisplayUntilActive
          shouldHideAfterFirstActivation={
            props.shouldHideHintAfterFirstActivation
          }
        >
          <HintComponent
            isTouchDetected={isTouchDetected}
            hintTextMouse={props.hintTextMouse}
            hintTextTouch={props.hintTextTouch}
          />
        </DisplayUntilActive>
      )}
      {getShouldShowLens() && (
        <Lens
          cursorOffset={cursorOffset}
          fadeDurationInMs={props.fadeDurationInMs}
          smallImage={props.smallImage}
          style={props.lensStyle}
        />
      )}
      <RenderEnlargedImage
        containerClassName={props.enlargedImageContainerClassName}
        containerDimensions={getEnlargedImageContainerDimensions()}
        containerStyle={props.enlargedImageContainerStyle}
        cursorOffset={cursorOffset}
        fadeDurationInMs={props.fadeDurationInMs}
        imageClassName={props.enlargedImageClassName}
        imageStyle={props.enlargedImageStyle}
        largeImage={props.largeImage}
        smallImage={props.smallImage}
        portalId={props.enlargedImagePortalId}
        isPortalEnabledForTouch={props.isEnlargedImagePortalEnabledForTouch}
        isTouchDetected={getIsTouchDetected()}
        isInPlaceMode={getIsInPlaceMode()}
      />
    </ReactCursorPosition>
  );
};

export default ReactImageMagnify;
