import { format } from "date-fns";

export const formattedTime = (dateTime?: string) => {
  const dateToFormat = dateTime ? new Date(dateTime) : new Date();
  return format(dateToFormat, "dd-MM-yy HH:mm");
};
