import { format } from "date-fns";

export const formattedTime = (dateTime: string) => {
  return format(new Date(dateTime), "dd-MM-yyyy HH:mm");
};
