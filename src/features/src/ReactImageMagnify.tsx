import React, { FC, useEffect, useState } from "react";
import ReactCursorPosition from "react-cursor-position";
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

interface Props {
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
  const { mouse: MOUSE, touch: TOUCH } = INPUT_TYPE;

  const [state, setState] = useState({
    smallImageWidth: 0,
    smallImageHeight: 0,
    detectedInputType: {
      isMouseDetected: primaryInput === MOUSE,
      isTouchDetected: primaryInput === TOUCH,
    },
  });

  useEffect(() => {
    const {
      smallImage: { isFluidWidth },
    } = props;

    if (!isFluidWidth) {
      return;
    }

    setSmallImageDimensionState();
    window.addEventListener("resize", setSmallImageDimensionState);
  });

  /**
   * onSmallImageLoad
   * @param e
   */
  const onSmallImageLoad = () => {
    const {
      smallImage: { onLoad = noop, isFluidWidth },
    } = props;

    onLoad();

    if (!isFluidWidth) {
      return;
    }

    setSmallImageDimensionState();
  };

  /**
   * onDetectedInputTypeChanged
   * @param detectedInputType
   */
  const onDetectedInputTypeChanged = (detectedInputType: any) => {
    const updatedState = { ...state, detectedInputType };
    setState(updatedState);
  };

  /**
   * setSmallImageDimensionState
   */
  const setSmallImageDimensionState = () => {
    const { offsetWidth: smallImageWidth, offsetHeight: smallImageHeight } =
      this.smallImageEl;

    const updatedState = { ...state, smallImageWidth, smallImageHeight };
    setState(updatedState);
  };

  /**
   * getSmallImage
   */
  const getSmallImage = () => {
    const {
      smallImage,
      smallImage: { isFluidWidth },
    } = props;

    if (!isFluidWidth) {
      return smallImage;
    }

    const { smallImageWidth: fluidWidth, smallImageHeight: fluidHeight } =
      state;

    return Object.assign({}, smallImage, {
      width: fluidWidth,
      height: fluidHeight,
    });
  };

  /**
   * getEnlargedImagePlacement
   */
  const getEnlargedImagePlacement = () => {
    const { enlargedImagePosition: userDefinedEnlargedImagePosition } = props;

    const {
      detectedInputType: { isTouchDetected },
    } = state;

    const computedEnlargedImagePosition = isTouchDetected
      ? ENLARGED_IMAGE_POSITION.over
      : ENLARGED_IMAGE_POSITION.beside;

    return userDefinedEnlargedImagePosition || computedEnlargedImagePosition;
  };

  /**
   * getIsInPlaceMode
   */
  const getIsInPlaceMode = () => {
    const { over: OVER } = ENLARGED_IMAGE_POSITION;
    return getEnlargedImagePlacement() === OVER;
  };

  /**
   * getEnlargedImageContainerDimensions
   * @return  {width: number | string, height: number | string}
   */
  const getEnlargedImageContainerDimensions = () => {
    const {
      enlargedImageContainerDimensions: {
        width: containerWidth,
        height: containerHeight,
      },
    } = props;

    const { width: smallImageWidth, height: smallImageHeight } =
      this.smallImage;

    const isInPlaceMode = getIsInPlaceMode();

    return {
      width: getEnlargedImageContainerDimension({
        containerDimension: containerWidth as string,
        smallImageDimension: smallImageWidth,
        isInPlaceMode,
      }),
      height: getEnlargedImageContainerDimension({
        containerDimension: containerHeight as string,
        smallImageDimension: smallImageHeight,
        isInPlaceMode,
      }),
    };
  };

  /**
   * getIsTouchDetected
   * @return boolean
   */
  const getIsTouchDetected = () => {
    const {
      detectedInputType: { isTouchDetected },
    } = state;

    return isTouchDetected;
  };

  /**
   * getShouldShowLens
   * @return boolean
   */
  const getShouldShowLens = () => {
    return !getIsInPlaceMode() && !getIsTouchDetected();
  };

  /**
   * getLensComponent
   */
  const getLensComponent = () => {
    const { shouldUsePositiveSpaceLens, lensComponent } = props;

    if (lensComponent) {
      return lensComponent;
    }

    if (shouldUsePositiveSpaceLens) {
      return PositiveSpaceLens;
    }

    return NegativeSpaceLens;
  };

  const {
    smallImage: { onError = noop },
    largeImage,
    hintComponent: HintComponent,
  } = props;

  const smallImage = getSmallImage();

  const {
    detectedInputType: { isTouchDetected },
  } = state;

  const cursorOffset = getLensCursorOffset(
    smallImage,
    largeImage,
    getEnlargedImageContainerDimensions()
  );

  const Lens = getLensComponent();

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
        ref={(el) => (this.smallImageEl = el)}
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
