import React from "react";
import { LensProps } from "../../prop-types/";
import LensTop from "./LensTop";
import LensLeft from "./LensLeft";
import LensRight from "./LensRight";
import LensBottom from "./LensBottom";

/**
 * NegativeSpaceLens
 * @param inputProps
 * @return JSX.Element
 */
function NegativeSpaceLens(inputProps: LensProps) {
  const { style: userSpecifiedStyle } = inputProps;

  const compositeLensStyle = Object.assign(
    { backgroundColor: "rgba(0,0,0,.4)" },
    userSpecifiedStyle
  );

  const props = Object.assign({}, inputProps, { style: compositeLensStyle });

  return (
    <div>
      <LensTop {...props} />
      <LensLeft {...props} />
      <LensRight {...props} />
      <LensBottom {...props} />
    </div>
  );
}

export default NegativeSpaceLens;
