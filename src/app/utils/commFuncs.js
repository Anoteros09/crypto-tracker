import { capitalize } from "@mui/material";

export function getCurrentURL() {
  return window.location.origin;
}

export const joinPaths = (...args) => args.join("/");

export function getLastTimeFromData(data) {
  let time = new Date(0).getTime();
  data.map((ele) => {
    if (new Date(ele.date).getTime() > time) {
      time = new Date(ele.date).getTime();
    }
  });
}

export function getCurrentSymbol(currencyCode) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: capitalize(currencyCode), // Capitalize the currency code
    minimumFractionDigits: 0, // We don't need decimals for this
  });

  // Extract the currency symbol from a formatted string
  const formatted = formatter.format(1); // Example value
  const symbol = formatted.replace(/\d|,|\.|\s/g, ""); // Remove digits, commas, periods, and spaces
  return symbol;
}
