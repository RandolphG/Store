interface Props {
  style: {};
  fadeDurationInMs: number;
  isActive: boolean;
  translateX?: number;
  translateY?: number;
  userStyle?: {};
  isPositionOutside: boolean;
}

/**
 * Lens
 * @param style
 * @param fadeDurationInMs
 * @param isActive
 * @param translateX
 * @param translateY
 * @param userStyle
 * @param isPositionOutside
 * @return JSX.Element
 */
const Lens = ({
  style,
  fadeDurationInMs = 0,
  isActive = false,
  translateX = 0,
  translateY = 0,
  userStyle,
  isPositionOutside,
}: Props) => {
  const defaultStyle = {
    width: "auto",
    height: "auto",
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto",
    display: "block",
  };

  const computedStyle = {
    position: "absolute",
    opacity: isActive && !isPositionOutside ? 1 : 0,
    transition: `opacity ${fadeDurationInMs}ms ease-in`,
  };

  const compositeStyle = Object.assign({}, defaultStyle, style, computedStyle);

  //TODO Try to see why this is not working
  /*@ts-ignore*/
  return <div style={compositeStyle} />;
};

export default Lens;
