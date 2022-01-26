import { parseISO, format } from "date-fns";
export default function Date({ dateString }) {
  const date = parseISO(dateString); // pase the date string into a date object
  console.log(date);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
