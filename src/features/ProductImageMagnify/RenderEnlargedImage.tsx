import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import EnlargedImage from "./EnlargedImage";
import { ContainerDimensions } from "./prop-types";

interface Props {
  containerClassName: string;
  containerDimensions: ContainerDimensions;
  isPortalEnabledForTouch: boolean;
  isTouchDetected: boolean;
  portalId: string;
}

/**
 * RenderEnlargedImage
 * @param props
 */
const RenderEnlargedImage = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);

    if (getIsPortalRendered()) {
      const { portalId } = props;
      const element = document.getElementById(portalId);
      setPortalElement(element);
    }
  }, []);

  const getIsPortalIdImplemented = () => {
    return !!props.portalId;
  };

  const getIsPortalRendered = () => {
    const { isPortalEnabledForTouch, isTouchDetected } = props;

    if (!getIsPortalIdImplemented()) {
      return false;
    }

    if (!isTouchDetected) {
      return true;
    }

    return isPortalEnabledForTouch;
  };

  const getIsMounted = () => {
    return isMounted;
  };

  const getCompositeProps = () => {
    return Object.assign({}, props, {
      isPortalRendered: getIsPortalRendered(),
    });
  };

  if (!isMounted) {
    return null;
  }

  const propsToPass = getCompositeProps();

  if (getIsPortalRendered()) {
    return ReactDOM.createPortal(
      <EnlargedImage {...propsToPass} />,
      portalElement!
    );
  }

  return <EnlargedImage {...propsToPass} />;
};
export default RenderEnlargedImage;
