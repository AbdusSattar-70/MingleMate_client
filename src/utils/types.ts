export type NavLinkType = {
  path: string;
  title: string;
};

export type Users = {
  id: number;
  authToken: string;
  avatar: string;
  user_name: string;
  email: string;
  updated_at: string;
  blocked: boolean;
  role: number;
  bio: string;
  created_at: string;
  items_count: number;
  collections_count: number;
  profession: string;
};

export type AuthData = {
  id?: number;
  authToken?: string;
  avatar?: string;
  collectImg?: string;
  user_name?: string;
  email?: string;
  updated_at?: string;
  blocked?: boolean;
  role?: number;
  bio?: string;
  items_count?: number;
  collections_count?: number;
  profession?: string;
};

export type CustomFieldType = {
  id: string;
  field_name: string;
  field_type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field_value?: any;
};

export type CollectionType = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  user_name: string;
  custom_fields: CustomFieldType[];
  items_count: number;
  items: ItemType[];
};

export type ItemType = {
  id: string;
  item_name: string;
  item_author: string;
  collection_id: string;
  item_custom_fields: CustomFieldType[];
  tags: string[];
  likes: number;
  comments: CommentType[];
  comments_count: number;
};

export type CommentType = {
  id: string;
  content: string;
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

export type TagOption = {
  value: string;
  label: string;
};
