import { Notification } from "../features";
import { Product, Products } from "../types";

export const defaultUrl = "https://via.placeholder.com/350?text=No+Image";
export const defaultAlt = "A placeholder to replace a missing product image.";

export enum Bootstrap {
  BOOTSTRAP_XS = 576,
  BOOTSTRAP_MD = 768,
  BOOTSTRAP_LG = 992,
}

/**
 * removeItem
 * @description remove element from array
 * @param {T[]} arr
 * @param {T} item
 * @return {T[]}
 */
export function removeItem<T>([...arr]: T[], item: T) {
  const index = arr.indexOf(item);
  index > -1 && arr.splice(index, 1);
  return arr;
}

/**
 * remove
 * @description remove element from array
 * @param arr
 * @param id
 * @return {string[]}
 */
export const remove = (arr: string[], id: string) => {
  const bufferArray = [...arr];
  bufferArray.splice(
    bufferArray.findIndex((notification) => notification === id),
    1
  );

  return bufferArray;
};

/**
 * random
 * @description give a random value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function random(min: number, max: number) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

/**
 * add element to array
 * @param arr
 * @param id
 * @return{string[] | Product[]}
 */
export const add = (arr: (string | Product)[], id: string | Product) => {
  return [...arr, id];
};

/**
 * check to see if elements exist in array
 * @param {[]} original
 * @param {[]} filter
 * @return {boolean}
 */
export const contains = (original: any[], filter: any[]) => {
  const res = filter.map((item: Notification) => {
    return original.includes(item);
  });

  return !res.includes(false);
};

/**
 * sort scores alphabetically
 * @param scores
 * @return void
 */
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

/**
 * removeTrailingSpace
 * @param {string} text
 * @return {string | null}
 */
export function removeTrailingSpace(text: string) {
  const match = text.match(/(.*\s*)*\w+/g);
  return match && match[0];
}

/**
 * getProducts
 * @description fetch product data
 * @return {Promise<Products>}
 */
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

/* framer animations */
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
