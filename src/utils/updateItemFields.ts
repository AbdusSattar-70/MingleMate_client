import { CustomFieldType } from "./types";

export const updateItemCustomFields = (
  prevCustomFields: CustomFieldType[],
  collectionCurrentFields: CustomFieldType[]
) => {
  return prevCustomFields.concat(
    collectionCurrentFields.filter(
      (customField) =>
        !prevCustomFields.some((itemField) => itemField.id === customField.id)
    )
  );
};
