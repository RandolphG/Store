import { useEffect, useState } from "react";
import { ENLARGED_IMAGE_POSITION, INPUT_TYPE } from "./constants";
import { PositiveSpaceLens, NegativeSpaceLens } from "./lens";
import { getEnlargedImageContainerDimension, getLensCursorOffset } from "./lib";
import { cursorOffset, ReactImageMagnifyProps } from "./prop-types";
import { primaryInput, noop } from "./utils";

export const useReactImageMagnify = (props: ReactImageMagnifyProps) => {
  const { mouse: MOUSE, touch: TOUCH } = INPUT_TYPE;
  const [imageReference, setImageReference] = useState<HTMLImageElement | null>(
    null
  );
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
   * @description set dimensions of small image
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
   * @return void
   */
  const onDetectedInputTypeChanged = (detectedInputType: any) => {
    const updatedState = { ...state, detectedInputType };
    setState(updatedState);
  };

  /**
   * setSmallImageDimensionState
   * @return void
   */
  const setSmallImageDimensionState = () => {
    const { offsetWidth: smallImageWidth, offsetHeight: smallImageHeight } =
      imageReference!;

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
      imageReference!;

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
   * @description return type of lens
   * @return PositiveSpaceLens|NegativeSpaceLens|DefaultHint
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

  const { largeImage, hintComponent: Hint } = props;

  const {
    detectedInputType: { isTouchDetected },
  } = state;

  const smallImage = getSmallImage();

  const cursorOffset: cursorOffset = getLensCursorOffset(
    smallImage,
    largeImage,
    getEnlargedImageContainerDimensions()
  );

  const Lens = getLensComponent();

  return {
    props,
    Lens,
    getEnlargedImageContainerDimensions,
    getEnlargedImagePlacement,
    getShouldShowLens,
    onDetectedInputTypeChanged,
    onSmallImageLoad,
    isTouchDetected,
    cursorOffset,
    getIsTouchDetected,
    getIsInPlaceMode,
    Hint,
    setImageReference,
  };
};
