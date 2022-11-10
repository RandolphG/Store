import { ENLARGED_IMAGE_POSITION } from "../constants";

export type EnlargedImagePosition =
  | ENLARGED_IMAGE_POSITION.beside
  | ENLARGED_IMAGE_POSITION.over;

export type EnlargedImageContainerDimensions = {
  width: number | string;
  height: number | string;
};

export type ContainerDimensions = {
  width: number;
  height: number;
};
