import { zonedTimeToUtc } from "date-fns-tz";

const convertDate = (date: string) => {
  const utcTime = zonedTimeToUtc(date, "America/Toronto");
  return utcTime.toISOString();
};

export default convertDate;
