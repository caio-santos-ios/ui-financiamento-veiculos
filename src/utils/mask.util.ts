export const maskDate = (dateString: string) => {
  if (!dateString) return "";
  const [dateArray] = dateString.split("T");
  const [year, month, day] = dateArray.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return date.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

export const maskCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const maskPercent = (value: number) => {
  return `${value.toFixed(2)}%`;
};

export const maskCurrencyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  let value = event.target.value.replace(/\D/g, "");
  value = (parseInt(value || "0") / 100).toFixed(2);
  const [int, dec] = value.split(".");
  const formatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + dec;
  event.target.value = formatted;
};

export const parseCurrencyInput = (value: string): number => {
  const cleaned = value.replace(/\./g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
};
