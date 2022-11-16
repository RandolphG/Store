import React from "react";
import { CursorPosition } from "../cursorPosition";
import { useReactImageMagnify } from "./useReactImageMagnify";
import RenderEnlargedImage from "./RenderEnlargedImage";
import { DisplayUntilActive } from "./hint";
import { getContainerStyle, getSmallImageStyle } from "./lib";
import { ReactImageMagnifyProps } from "./prop-types/";
import { noop } from "./utils";

/**
 * ReactImageMagnify
 * @description Magnify the image of reference
 * @param passedProps
 * @return JSX.Element
 */
const ReactImageMagnify = (passedProps: ReactImageMagnifyProps) => {
  const {
    props,
    isTouchDetected,
    cursorOffset,
    Hint,
    onDetectedInputTypeChanged,
    onSmallImageLoad,
    getEnlargedImageContainerDimensions,
    getIsTouchDetected,
    getIsInPlaceMode,
    getShouldShowLens,
    Lens,
    handImageRef,
  } = useReactImageMagnify(passedProps);
  return (
    <CursorPosition
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
        /*@ts-ignore*/
        style={getSmallImageStyle(props.smallImage, props.imageStyle)}
        ref={handImageRef}
        onLoad={onSmallImageLoad}
        onError={noop}
      />
      {props.isHintEnabled && (
        <DisplayUntilActive
          shouldHideAfterFirstActivation={
            props.shouldHideHintAfterFirstActivation
          }
        >
          <Hint
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
        fadeDurationInMs={props.fadeDurationInMs}
        containerStyle={props.enlargedImageContainerStyle}
        imageClassName={props.enlargedImageClassName}
        imageStyle={props.enlargedImageStyle}
        cursorOffset={cursorOffset}
        largeImage={props.largeImage}
        smallImage={props.smallImage}
        portalId={props.enlargedImagePortalId}
        isPortalEnabledForTouch={props.isEnlargedImagePortalEnabledForTouch}
        isTouchDetected={getIsTouchDetected()}
        isInPlaceMode={getIsInPlaceMode()}
      />
    </CursorPosition>
  );
};

export default ReactImageMagnify;
