import { AVATAR, COLLECT_IMG, ITEM_IMG } from "./constant";

export const detectPhoto = (usage: string) => {
  if (usage === AVATAR) return AVATAR;
  if (usage === COLLECT_IMG) return COLLECT_IMG;
  return ITEM_IMG;
};
