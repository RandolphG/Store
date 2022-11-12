import React from "react";
import { EnlargedImageProps } from "./prop-types";
import { useEnlargeImage } from "./useEnlargeImage";
import { noop } from "./utils";

const EnlargedImage = (props: EnlargedImageProps) => {
  const { getContainerStyle, getIsVisible } = useEnlargeImage(props);

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
