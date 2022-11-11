export function isPercentageFormat(val: string | number) {
  return typeof val === "string" && /^\d+%$/.test(val);
}

export function convertPercentageToDecimal(percentage: number) {
  return percentage / 100;
}

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
