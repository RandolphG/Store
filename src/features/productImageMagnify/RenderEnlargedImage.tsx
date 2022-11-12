import React from "react";
import ReactDOM from "react-dom";
import EnlargedImage from "./EnlargedImage";
import { RenderEnlargedImageProps } from "./prop-types";
import { useRenderEnlargeImage } from "./useRenderEnlargeImage";

/**
 * RenderEnlargedImage
 * @param {RenderEnlargedImageProps} props
 */
const RenderEnlargedImage = (props: RenderEnlargedImageProps) => {
  const { isMounted, portalElement, propsToPass, getIsPortalRendered } =
    useRenderEnlargeImage(props);
  if (!isMounted) {
    return null;
  }

  if (getIsPortalRendered()) {
    return ReactDOM.createPortal(
      <EnlargedImage {...propsToPass} />,
      portalElement!
    );
  }

  return <EnlargedImage {...propsToPass} />;
};

export default RenderEnlargedImage;
