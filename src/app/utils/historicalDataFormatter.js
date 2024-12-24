function formatTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp); // Convert UNIX timestamp (seconds) to milliseconds

  const pad = (num) => String(num).padStart(2, "0"); // Function to pad single digits with a leading zero

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // Months are zero-based in JavaScript
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return new Date(year, month, day, hours, minutes, seconds);
}

export default function historicalArrayFormatter(histData) {
  const formattedData = [];
  histData.map((data) => {
    const price = data[1];
    const date = formatTimestamp(data[0]);
    formattedData.push({ price, date });
  });
  return formattedData;
}
