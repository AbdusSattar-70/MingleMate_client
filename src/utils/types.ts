export type NavLinkType = {
  path: string;
  title: string;
};

export type Users = {
  id: string;
  authToken: string;
  avatar: string;
  user_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  blocked: boolean;
  role: number;
  bio: string;
  items_count: number;
  collections_count: number;
  profession: string;
};

export type AuthData = {
  id: string;
  authToken: string;
  avatar: string;
  collectImg?: string;
  user_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  blocked: boolean;
  role: number;
  bio: string;
  items_count: number;
  collections_count: number;
  profession: string;
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
  item_id: string;
  item_name: string;
  item_author: string;
  collection_id: string;
  collection_name: string;
  item_custom_fields: CustomFieldType[];
  tags: string[];
  likes: LikeType[];
  comments: CommentType[];
  comments_count: number;
  image?: string;
};

export type TAGRelatedItemType = {
  item_id: string;
  item_name: string;
  collection_name: string;
  item_author: string;
  likes: number;
  comments: number;
  created_at: string;
  updated_at: string;
};

export type CommentType = {
  comment_id: string;
  content: string;
  commenter_name: string;
  commenter_avatar: string;
  commenter_id: string;
  created_at: string;
  updated_at: string;
};

export type LikeType = {
  id: string;
  user_id: string;
  user_photo: string;
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

export type SearchInputProps = {
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isFocused: boolean;
};
