export const generateImageUrl = (image: string) => {
  // remove b' if present
  if (!image) return `data:image/png;base64,`;
  if (image.startsWith("b'")) {
    image = image.slice(2);
  }
  image = image.slice(0, -1);
  return `data:image/png;base64,${image}`;
};

// format number to max decimal if more than 2 decimal places
export const formatNumber = (number: number, maxDecimal: number = 2) => {
  if (number === undefined || number === null) return "-";
  if (number.toString().includes(".")) {
    return Math.round(number * 10 ** maxDecimal) / 10 ** maxDecimal;
  }
  return number;
};
