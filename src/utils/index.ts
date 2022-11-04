import { Notification } from "../features";
import { Product, Products } from "../types";

export function removeItem<T>([...arr]: T[], item: T) {
  const index = arr.indexOf(item);
  index > -1 && arr.splice(index, 1);
  return arr;
}

/* remove notification from array */
export const remove = (arr: string[], id: string) => {
  const notificationsArray = [...arr];
  notificationsArray.splice(
    notificationsArray.findIndex((notification) => notification === id),
    1
  );

  return notificationsArray;
};

/* add notification to array */
export const add = (arr: (string | Product)[], id: string | Product) => {
  return [...arr, id];
};

/* check to see if elements exist in array */
export const contains = (original: Notification[], filter: Notification[]) => {
  const res = filter.map((item: Notification) => {
    return original.includes(item);
  });

  return !res.includes(false);
};

/* sort scores alphabetically */
export const sort = (scores: any[]) => {
  scores.sort((a, b) => {
    return b.score - a.score;
  });
};

/* filter object based on keys
 * https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
 * */
export const filterObjectByKey = (key: string, data: any) => {
  return Object.keys(data)
    .filter((item) => item.includes(key))
    .reduce((obj: any, key: any) => {
      obj[key] = data[key];
      return obj;
    }, {});
};

export const BOOTSTRAP_XS = 576;
export const BOOTSTRAP_MD = 768;
export const BOOTSTRAP_LG = 992;

export const defaultUrl = "https://via.placeholder.com/350?text=No+Image";
export const defaultAlt = "A placeholder to replace a missing product image.";

export function removeTrailingSpace(text: string) {
  const match = text.match(/(.*\s*)*\w+/g);
  return match && match[0];
}

export const getProducts = async (): Promise<Products> => {
  const data = require("./config.json");

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
