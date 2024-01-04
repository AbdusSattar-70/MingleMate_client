export type NavLinkType = {
  path: string;
  title: string;
};

export type Users = {
  id: number;
  user_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  blocked: boolean;
  role: number;
  avatar?: string | null;
};

export type TopicKey =
  | "EDUCATION"
  | "TECHNOLOGY"
  | "TRAVEL"
  | "HEALTH_AND_WELLNESS"
  | "PHOTOGRAPHY"
  | "FOOD_AND_COOKING"
  | "FITNESS"
  | "HISTORY"
  | "SCIENCE"
  | "FASHION"
  | "ART_AND_CRAFTS"
  | "MUSIC"
  | "SPORTS"
  | "NATURE_AND_WILDLIFE"
  | "DIY_PROJECTS"
  | "HOME_DECOR"
  | "GAMING"
  | "FINANCE_AND_INVESTMENT"
  | "MOVIES_AND_TV_SHOWS"
  | "GARDENING"
  | "MOTIVATION_AND_SELF_HELP";

export type CustomFieldKey = "string" | "text" | "number" | "boolean" | "date";

export type CustomField = {
  id: number;
  field_name: string;
  field_type: string;
};
