export function noop() {}

/*  */
/**
 * @description limit the position to specific area
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function clamp(value: number, min: number, max: number) {
  min > value ? (value = min) : value > max && (value = max);
  return value;
}
