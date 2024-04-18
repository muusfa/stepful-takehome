export const formatDate = (inputDateStr: string): string => {
  const inputDate = new Date(inputDateStr); // Create a Date object from input date string

  // Define options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // Full day of the week (e.g., Monday)
    month: "long", // Full month name (e.g., April)
    day: "numeric", // Day of the month (e.g., 11)
    hour: "numeric", // Hour in 12-hour format (e.g., 2)
    minute: "numeric", // Minute (e.g., 00)
    hour12: true, // Use 12-hour clock (true for AM/PM)
  };

  // Format the date using Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(inputDate);

  return formattedDate;
};
