import React, { useEffect, useState } from "react";

interface Props {
  shouldHideAfterFirstActivation: boolean;
  isActive?: boolean;
  children: JSX.Element;
}

/**
 * DisplayUntilActive
 * @param children
 * @param isActive
 * @param shouldHideAfterFirstActivation
 * @constructor
 */
const DisplayUntilActive = ({
  children,
  shouldHideAfterFirstActivation = true,
  isActive,
}: Props) => {
  const [hasShown, setHasShown] = useState(false);
  const shouldShow =
    !isActive && (!hasShown || !shouldHideAfterFirstActivation);

  useEffect(() => {
    if (isActive && !hasShown) {
      setHasShown(true);
    }
  }, []);

  return shouldShow ? children : null;
};

export default DisplayUntilActive;
