import { useEffect, useState } from "react";
import { RenderEnlargedImageProps } from "./prop-types";

export const useRenderEnlargeImage = (props: RenderEnlargedImageProps) => {
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

  /**
   * getIsPortalIdImplemented
   * @return boolean
   */
  const getIsPortalIdImplemented = () => {
    return !!props.portalId;
  };

  /**
   * getIsPortalRendered
   * @return boolean
   */
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

  /**
   * getCompositeProps
   * @return RenderEnlargedImageProps & {isPortalRendered: boolean}
   */
  const getCompositeProps = () => {
    return Object.assign({}, props, {
      isPortalRendered: getIsPortalRendered(),
    });
  };

  const propsToPass = getCompositeProps();

  return { propsToPass, getIsPortalRendered, portalElement, isMounted };
};
