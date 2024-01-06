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

export type AuthData = {
  blocked?: boolean;
  id?: number;
  authToken?: string;
  role?: number;
  avatar?: string;
  collectImg?: string;
};

// export type TopicKey =
//   | "EDUCATION"
//   | "TECHNOLOGY"
//   | "TRAVEL"
//   | "HEALTH_AND_WELLNESS"
//   | "PHOTOGRAPHY"
//   | "FOOD_AND_COOKING"
//   | "FITNESS"
//   | "HISTORY"
//   | "SCIENCE"
//   | "FASHION"
//   | "ART_AND_CRAFTS"
//   | "MUSIC"
//   | "SPORTS"
//   | "NATURE_AND_WILDLIFE"
//   | "DIY_PROJECTS"
//   | "HOME_DECOR"
//   | "GAMING"
//   | "FINANCE_AND_INVESTMENT"
//   | "MOVIES_AND_TV_SHOWS"
//   | "GARDENING"
//   | "MOTIVATION_AND_SELF_HELP";

// export type CustomFieldKey = "string" | "text" | "number" | "boolean" | "date";

export type CustomFieldType = {
  id: string;
  field_name: string;
  field_type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field_value?: any;
};

export type CollectionType = {
  id: number;
  title: string;
  description: string;
  image: string;
  custom_fields: CustomFieldType[];
  items_count: number;
  user_name: string;
};

export type InputFieldProps = {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  className: string;
};

export type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { key: string; value: string }[];
};
