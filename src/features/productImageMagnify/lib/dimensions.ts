/**
 * isPercentageFormat
 * @param val
 */
export function isPercentageFormat(val: string | number) {
  return typeof val === "string" && /^\d+%$/.test(val);
}

/**
 * convertPercentageToDecimal
 * @param percentage
 */
export function convertPercentageToDecimal(percentage: number) {
  return percentage / 100;
}

/**
 * getEnlargedImageContainerDimension
 * @param containerDimension
 * @param smallImageDimension
 * @param isInPlaceMode
 */
export function getEnlargedImageContainerDimension({
  containerDimension,
  smallImageDimension,
  isInPlaceMode,
}: {
  containerDimension: number;
  smallImageDimension: number;
  isInPlaceMode: boolean;
}) {
  if (isInPlaceMode) {
    return smallImageDimension;
  }

  if (isPercentageFormat(containerDimension)) {
    return smallImageDimension * convertPercentageToDecimal(containerDimension);
  }

  return containerDimension;
}
