import React, { useEffect, useMemo, useState } from "react";
import {
  getLensModeEnlargedImageCoordinates,
  getInPlaceEnlargedImageCoordinates,
} from "./lib/imageCoordinates";
import { LargeImageShape, SmallImageShape } from "./prop-types/Image";
import { ContainerDimensions } from "./prop-types/EnlargedImage";
import { noop } from "./utils";
import { Point } from "./prop-types/Point";
import {
  getEnlargedImageContainerStyle,
  getEnlargedImageStyle,
} from "./lib/styles";

interface Props {
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

interface Transition {
  isTransitionEntering: boolean;
  isTransitionActive: boolean;
  isTransitionLeaving: boolean;
  isTransitionDone: boolean;
}

const EnlargedImage = (props: Props) => {
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
  const scheduleCssTransition = (nextProps: Props) => {
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

  const component = () => {
    const {
      largeImage: { alt = "", onLoad = noop, onError = noop },
    } = props;

    return (
      <div className={props.containerClassName} style={getContainerStyle()}>
        {/*
            TS2322: Type '{ width: number; height: number; transform: string; WebkitTransform: string;
            msTransform: string; pointerEvents: string; }' is not assignable to type 'Properties<string | number, string & {}>'.
             Types of property 'pointerEvents' are incompatible.
             Type 'string' is not assignable to type 'PointerEvents | undefined'.
        */}
        <img
          alt="EnlargedImage"
          className={props.imageClassName}
          src={props.largeImage.src}
          srcSet={props.largeImage.srcSet}
          sizes={props.largeImage.sizes}
          /*@ts-ignore*/
          style={getImageStyle()}
          onLoad={() => {}}
          onError={() => {}}
        />
      </div>
    );
  };

  if (props.isLazyLoaded) {
    return getIsVisible() ? component : null;
  }

  return component;
};

export default EnlargedImage;
