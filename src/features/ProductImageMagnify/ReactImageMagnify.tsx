import React from "react";
import ReactCursorPosition from "react-cursor-position";
import { useReactImageMagnify } from "./useReactImageMagnify";
import RenderEnlargedImage from "./RenderEnlargedImage";
import { DisplayUntilActive } from "./hint";
import { getContainerStyle, getSmallImageStyle } from "./lib";
import { ReactImageMagnifyProps } from "./prop-types/";
import { noop } from "./utils";

/**
 * ReactImageMagnify
 * @constructor
 * @param passedProps
 */
const ReactImageMagnify = (passedProps: ReactImageMagnifyProps) => {
  const {
    props,
    onDetectedInputTypeChanged,
    onSmallImageLoad,
    isTouchDetected,
    getEnlargedImageContainerDimensions,
    cursorOffset,
    getIsTouchDetected,
    getIsInPlaceMode,
    getShouldShowLens,
    Lens,
    Hint,
    setImageReference,
  } = useReactImageMagnify(passedProps);
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
        ref={(el) => setImageReference(el)}
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
