import { FC, useEffect, useRef, useState } from "react";
import { ENLARGED_IMAGE_POSITION, INPUT_TYPE } from "./constants";
import NegativeSpaceLens from "./lens/negative-space";
import PositiveSpaceLens from "./lens/positive-space";
import { getEnlargedImageContainerDimension, getLensCursorOffset } from "./lib";
import {
  EnlargedImageContainerDimensions,
  EnlargedImagePosition,
  LargeImageShape,
  SmallImageShape,
} from "./prop-types";
import { Props } from "./ReactImageMagnify";
import { noop } from "./utils";
import { primaryInput } from "./utils/detectIt";

export const useReactImageMagnify = (props: Props) => {
  const { mouse: MOUSE, touch: TOUCH } = INPUT_TYPE;
  let imageReference = useRef(null);
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

  return props;
};
