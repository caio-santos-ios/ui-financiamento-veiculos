export const convertToNumber = (value: string | number): number => {
  if (typeof value === "number") return value;
  const cleaned = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
};
