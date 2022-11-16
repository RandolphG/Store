type BaseImageShape = {
  alt: string;
  src: string;
  srcSet: string;
  sizes: string;
  onLoad: () => void;
  onError: () => void;
};

export type LargeImageShape = {
  alt: string;
  src: string;
  srcSet: string;
  sizes: string;
  onLoad: () => void;
  onError: () => void;
  width: number;
  height: number;
};

export type SmallImageShape = {
  alt: string;
  src: string;
  srcSet: string;
  sizes: string;
  onLoad: () => void;
  onError: () => void;
  isFluidWidth: boolean;
  width: number;
  height: number;
};

export type EnlargedImageContainerStyleCache = {
  params: {};
  compositeStyle: {};
};

export type imageCoordinates = { x: number; y: number };

export type coordinates = { x: number; y: number };

export type minCoordinates = { x: number; y: number };

export type maxCoordinates = { x: number; y: number };

export type cursorOffset = { x: number; y: number };
