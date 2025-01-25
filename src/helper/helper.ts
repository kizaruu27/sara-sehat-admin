export const urlBE = () => {
  return "https://sarasehat-api.vercel.app";
};

export const currencyFormat = (price: any) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};
