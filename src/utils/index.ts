import { Notification } from "../features";

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
export const add = (arr: string[], id: string) => {
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
