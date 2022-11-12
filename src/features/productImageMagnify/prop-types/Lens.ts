import { Point } from "./Point";
import { SmallImageShape } from "./Image";

export type LensProps = {
  cursorOffset: Point;
  fadeDurationInMs: number;
  isActive: boolean;
  isPositionOutside: boolean;
  position: Point;
  smallImage: SmallImageShape;
  style: {};
};
