export const BOOTSTRAP_XS = 576;
export const BOOTSTRAP_MD = 768;
export const BOOTSTRAP_LG = 992;

export const defaultUrl = "https://via.placeholder.com/350?text=No+Image";
export const defaultAlt = "A placeholder to replace a missing product image.";

export function removeTrailingSpace(text: string) {
  const match = text.match(/(.*\s*)*\w+/g);
  return match && match[0];
}

export const getProducts = async () => {
  const data = require("../config/config.json");

  if (
    data &&
    data.products &&
    data.products.length &&
    data.products.length > 0
  ) {
    return data.products;
  }

  throw new Error("products config malformed");
};

const ease = [0.6, -0.05, 0.01, 0.99];
const duration = 1.0;
const transition = {
  duration,
  ease,
};

export const animationSettings = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition,
  },
  exit: { opacity: 0, transition },
};

export const scaleUp = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition,
  },
  exit: { opacity: 0, scale: 0.7, transition },
};

export const fadeInUp = {
  initial: {
    y: 10,
    opacity: 0,
    transition,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition,
  },
  exit: {
    y: 10,
    opacity: 0,
    transition,
  },
};

export const slideOut = {
  initial: {
    x: 10,
    opacity: 0,
    transition,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition,
  },
  exit: {
    x: 10,
    opacity: 0,
    transition,
  },
};

export interface Products {
  products: Product[];
}

export interface Product {
  productId: string;
  title: string;
  images: Image[];
  about: string;
  details: string[];
  options: Option[];
}

export interface Image {
  url: string;
  alt: string;
}

export interface Option {
  name: string;
  style: string;
  values: Value[];
}

export interface Value {
  value: string;
}
