import { formatDistanceToNow, format } from "date-fns";

export const formattedTime = (dateTime?: string) => {
  const dateToFormat = dateTime ? new Date(dateTime) : new Date();
  return format(dateToFormat, "dd-MM-yy HH:mm");
};

export const calculateTimeElapsed = (createdAt: string, updatedAt: string) => {
  const creationDate = new Date(createdAt);
  const updateDate = new Date(updatedAt);

  const timeElapsed = formatDistanceToNow(
    updateDate > creationDate ? updateDate : creationDate,
    { addSuffix: true }
  );

  return updateDate > creationDate
    ? `Edited ${timeElapsed}`
    : `Posted ${timeElapsed}`;
};
