import {
  type Duration,
  differenceInHours,
  differenceInMinutes,
  format,
  formatDuration,
  getMinutes,
  parseISO,
} from "date-fns";

function isISODateString(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function convertToLocalDate(isoString: string) {
  return parseISO(isoString);
}

// Common date formatting functions
const formatters = {
  time: (date: Date | string) =>
    format(typeof date === "string" ? parseISO(date) : date, "HH:mm"),
  date: (date: Date | string) =>
    format(typeof date === "string" ? parseISO(date) : date, "yyyy-MM-dd"),
  duration: (duration: Duration) =>
    formatDuration(duration, { format: ["days", "hours", "minutes"] })
      .replace(" days", "d")
      .replace(" hours", "h")
      .replace(" minutes", "m"),
};

function calculateDuration(startDate: Date, endDate: Date) {
  return {
    // https://date-fns.org/v4.1.0/docs/differenceInDays
    days: Math.trunc(differenceInHours(endDate, startDate) / 24) | 0,
    hours: differenceInHours(endDate, startDate) % 24,
    minutes: differenceInMinutes(endDate, startDate) % 60,
  };
}

function getDayProgressPercentage(date: Date) {
  const totalDayMinutes = 24 * 60;
  const elapsedMinutes = getMinutes(date);

  return (elapsedMinutes / totalDayMinutes) * 100;
}

export {
  calculateDuration,
  isISODateString,
  convertToLocalDate,
  formatters,
  getDayProgressPercentage,
};
