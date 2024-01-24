export const BASE_URL = "http://localhost:4000";
export const AXIOS_HEADERS = { "Content-Type": "application/json" };

export const ROUTES = {
  HOME: "/",
  SIGNUP: "/sign-up",
  SIGNIN: "/sign-in",
  USER_PROFILE: "/user-profile",
  PROFILE_EDIT: "/profile/edit",
  ADMIN_DASHBOARD: "/admin/dashboard",

  CREATE_COLLECTION: "/create-collection",
  EDIT_COLLECTION: "/edit-collection/collection-id",
  DIESPLAY_SINGLE_COLLECTION: "/collection/collection-id",
  USER_COLLECTIONS: "/user-collections/user-id",
  ALL_COLLECTIONS: "/all-collections",

  CREATE_ITEM: "/collection",
  EDIT_ITEM: "/edit-item",
  GET_SIGNLE_ITEM: "/item/item-id",
  USER_ITEMS: "/user-items/user-id",
  GET_ITEMS_ALL: "/all-items",
};

export const PICK_THEME = {
  THEME: "theme",
  DARK: "dark",
  LIGHT: "light",
};

export const COLLECT_IMG = "collectImg";
export const AVATAR = "avatar";
export const ITEM_IMG = "ItemImg";

export const API_ENDPOINT = {
  SIGN_UP: "signup",
  SIGN_IN: "signin",
  SIGN_OUT: "signout",
  UPDATE_DELETE_USER: "users",
  USER_PROFILE: "users",
  CURRENT_USER: "current_user",
  ADMIN: {
    USERS: "admin/users",
    BLOCK_URL: "admin/users/block",
    UNBLOCK_URL: "admin/users/unblock",
    DELETE_URL: "admin/users/delete",
    ASIGN_ADMIN_ROLE: "admin/users/assign_admin_role_multiple",
    REMOVE_ADMIN_ROLE: "admin/users/remove_from_admin_multiple",
  },
  USER_COLLECTIONS: "user_collections",
  TOP_FIVE_COLLECTIONS: "top_five_collections",
  COLLECTION: "collections",
  COLLECTION_CUSTOM_FIELDS: "collection/custom_fields",
  COLLECTION_ITEMS: "collection_items",
  USER_ITEMS: "user_items",
  ITEM: "items",
  COMMENT: "comments",
  LIKE: "likes",
  ITEM_LIKES_COUNT: "item_likes_count",
  SEARCH_ITEMS_FULL_TEXT: "full_text_search?search=",
  SORT_ITEMS: "sort_and_filter_items?sort_by=",
  TAG: "tags",
  TAG_RELATED_ITEMS: "tag_related_items?search=",
};

export const REGEX_PICK = {
  USER_REGEX: /^[A-Za-z][A-Za-z0-9_ -]{0,23}$/,
  PWD_REGEX: /.{6,}/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const MESSAGES = {
  CONFIRM_PWD: " Must match the first password input field.",
  VALID_NAME_NOTE:
    " Must begin with a letter. Letters, numbers, underscores, hyphens allowed.",
  EMAIL_NOTE: "Please enter a valid email address.",
  PWD_NOTE:
    "At least six characters. Letters, numbers, underscores, hyphens allowed",
  TRY_AGAIN:
    "Unable to process the request at this moment, Please try again later.",
  SUCCESS: "Congrats! Request has Succeeded",
  FILL_TYPE_FIELD: "please fill up field type",
  COLLECTION_FIELD: "title, topic and description is required",
  SERVER_OFFLINE: "server is offline, please try again",
  DELETE_MYSELF: {
    CONFIRM:
      "Are you sure you want to delete your account? When deleted, you will lose all data on this site, and it cannot be recovered.",
    SUCCESS:
      "Your account has been deleted successfully. We hope to see you again!",
    ERROR: "Sorry, there was an error. Please try again later.",
  },
};

export const DELETE_CONFIRMATION =
  "Are you sure you want to delete it? When deleted, it cannot be recovered.";

export const DASHBOARD_TABLE_CONST = {
  ALL_USER: "all",
  BLOCK: {
    SELECT_USER: "Please select at least one user to block.",
    CONFIRM: "Are you sure you want to block selected users?",
    SUCCESS: "Users blocked successfully.",
    ERROR: "Error blocking users. Please try again.",
  },
  UNBLOCK: {
    SELECT_USER: "Please select at least one user to unblock.",
    SUCCESS: "Users unblocked successfully.",
    ERROR: "Error unblocking users. Please try again.",
  },
  DELETE: {
    SELECT_USER: "Please select at least one user to delete.",
    CONFIRM:
      "Are you sure you want to delete selected users? When deleted, it cannot be recovered.",
    SUCCESS: "Users deleted successfully.",
    ERROR: "Error deleting users. Please try again.",
  },
  ROLE: {
    SELECT_USER: "Please select at least one user to change role.",
    CONFIRM: "Are you sure you want to change selected users role?",
    SUCCESS: "Role change action  Succeeded.",
    ERROR: "Error processing the request. Please try again.",
  },
};

export const FILTER_BY_USER = {
  ADMIN: "admin",
  BLOCKED: "blocked",
  GENERAL: "general",
  ACTIVE: "active",
};

export const SORT_BY_ITEMS = {
  ASC: "asc",
  DESC: "desc",
  TOP_LIKED: "most_liked",
  TOP_COMMENTED: "most_commented",
  NO_LIKE: "no_likes",
  NO_COMMENT: "no_comments",
};

export const FILTER_USERS = {
  [FILTER_BY_USER.ADMIN]: { role: 2 },
  [FILTER_BY_USER.GENERAL]: { role: 1 },
  [FILTER_BY_USER.BLOCKED]: { blocked: true },
  [FILTER_BY_USER.ACTIVE]: { blocked: false },
};

export const FieldType = {
  string: "Single line text",
  text: "Multi-line text or description type",
  number: "Number",
  boolean: "True/False Or Yes/No",
  date: "Date",
};

export const TOPICS = {
  Education: "Education",
  Technology: "Technology",
  Travel: "Travel",
  "Health and Wellness": "Health and Wellness",
  Photography: "Photography",
  "Food and Cooking": "Food and Cooking",
  Fitness: "Fitness",
  History: "History",
  Science: "Science",
  Fashion: "Fashion",
  "Art and Crafts": "Art and Crafts",
  Music: "Music",
  Sports: "Sports",
  "Nature and Wildlife": "Nature and Wildlife",
  "DIY Projects": "DIY Projects",
  "Home Decor": "Home Decor",
  Gaming: "Gaming",
  "Finance and Investment": "Finance and Investment",
  "Movies and TV Shows": "Movies and TV Shows",
  Gardening: "Gardening",
  "Motivation and Self-Help": "Motivation and Self-Help",
};

export const SWITCH_CASE = {
  STRING: "string",
  TEXT: "text",
  NUMBER: "number",
  BOOLEAN: "boolean",
  DATE: "date",
};

export const dummyImg =
  "https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp";

export const INITIAL_AUTH_STATE = {
  id: "",
  authToken: "",
  avatar: "",
  collectImg: "",
  ItemImg: "",
  user_name: "",
  email: "",
  created_at: "",
  updated_at: "",
  blocked: true,
  role: 0,
  bio: "",
  items_count: 0,
  collections_count: 0,
  profession: "",
};

export const INSTRUCTION_COLLECTION_CREATION = `
  When creating a new collection, you have the option to enhance its
  functionality by adding custom fields. These fields will be essential when
  you later add items to this collection. Feel free to choose any field names
  and specify their data types from the provided dropdown menu. For example,
  you might add a 'Price' field with the data type 'Number' or a 'Release
  Date' field with the data type 'Date'. You can add as many custom fields as
  needed for your collection. Don't worry; you can always edit or modify them
  later according to your preferences.
`;
