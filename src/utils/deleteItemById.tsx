export const deleteItemById = <T extends { id?: string }>(
  items: T[],
  id: string,
  setItems: React.Dispatch<React.SetStateAction<T[]>>
): void => {
  const updated = items.filter((item) => item.id !== id);
  setItems(updated);
};
