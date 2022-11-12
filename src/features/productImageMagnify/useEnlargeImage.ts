import { useEffect, useMemo, useState } from "react";
import {
  getEnlargedImageContainerStyle,
  getEnlargedImageStyle,
  getInPlaceEnlargedImageCoordinates,
  getLensModeEnlargedImageCoordinates,
} from "./lib";
import { EnlargedImageProps, Transition } from "./prop-types";

export const useEnlargeImage = (props: EnlargedImageProps) => {
  const [transitions, setTransitions] = useState<Transition>({
    isTransitionEntering: false,
    isTransitionActive: false,
    isTransitionLeaving: false,
    isTransitionDone: false,
  });

  const timers = [];

  useEffect(() => {}, []);

  const memoiseScheduleCssTransition = useMemo(
    () => scheduleCssTransition(props),
    [props]
  );

  /**
   * scheduleCssTransition
   * @param nextProps
   * TODO check validity of this function
   */
  const scheduleCssTransition = (nextProps: EnlargedImageProps) => {
    const { fadeDurationInMs, isActive, isPositionOutside } = props;
    const willIsActiveChange = isActive !== nextProps.isActive;
    const willIsPositionOutsideChange =
      isPositionOutside !== nextProps.isPositionOutside;

    if (!willIsActiveChange && !willIsPositionOutsideChange) {
      return;
    }

    if (nextProps.isActive && !nextProps.isPositionOutside) {
      const trans = {
        ...transitions,
        isTransitionDone: false,
        isTransitionEntering: true,
      };
      setTransitions(trans);

      timers.push(
        setTimeout(() => {
          const trans = {
            ...transitions,
            isTransitionEntering: false,
            isTransitionActive: true,
          };
          setTransitions(trans);
        }, 0)
      );
    } else {
      const trans = {
        ...transitions,
        isTransitionLeaving: true,
        isTransitionActive: false,
      };
      setTransitions(trans);
      timers.push(
        setTimeout(() => {
          const trans = {
            ...transitions,
            isTransitionDone: true,
            isTransitionLeaving: false,
          };
          setTransitions(trans);
        }, fadeDurationInMs)
      );
    }
  };

  /**
   * getImageCoordinates
   * @return
   */
  const getImageCoordinates = () => {
    const {
      cursorOffset,
      largeImage,
      containerDimensions,
      position,
      smallImage,
      isInPlaceMode,
    } = props;

    if (isInPlaceMode) {
      return getInPlaceEnlargedImageCoordinates({
        containerDimensions,
        largeImage,
        position,
      });
    }

    return getLensModeEnlargedImageCoordinates({
      containerDimensions,
      cursorOffset,
      largeImage,
      position,
      smallImage,
    });
  };

  const getIsVisible = () => {
    const { isTransitionEntering, isTransitionActive, isTransitionLeaving } =
      transitions;
    return isTransitionEntering || isTransitionActive || isTransitionLeaving;
  };

  const getContainerStyle = () => {
    const { isTransitionActive } = transitions;
    const {
      containerStyle,
      containerDimensions,
      fadeDurationInMs,
      isPortalRendered,
      isInPlaceMode,
    } = props;

    return getEnlargedImageContainerStyle({
      containerDimensions,
      containerStyle,
      fadeDurationInMs,
      isTransitionActive,
      isInPlaceMode,
      isPortalRendered,
    });
  };

  const getImageStyle = () => {
    const { imageStyle, largeImage } = props;

    return getEnlargedImageStyle({
      imageCoordinates: getImageCoordinates(),
      imageStyle,
      largeImage,
    });
  };

  return { getIsVisible, getContainerStyle };
};
