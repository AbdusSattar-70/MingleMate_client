import { AVATAR, COLLECT_IMG } from "./constant";

export const detectPhoto = (usage: string) => {
  return usage === AVATAR ? AVATAR : COLLECT_IMG;
};
