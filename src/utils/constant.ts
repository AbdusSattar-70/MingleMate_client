// import { CustomFieldKey, TopicKey } from "./types";

export const BASE_URL = "http://localhost:4000";
export const AXIOS_HEADERS = { "Content-Type": "application/json" };

export const ROUTES = {
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  MY_PROFILE: "/my-profile",
  PROFILE_EDIT: "/profile/edit",
  ADMIN_DASHBOARD: "/admin/dashboard",
  CREATE_COLLECTION: "/create-collection",
  EDIT_COLLECTION: "/edit-collection",
  DIESPLAY_SINGLE_COLLECTION: "/my-collection",
  DISPLAY_ALL_COLLECTIONS: "/my-all-collections",
  CREATE_ITEM: "/collection",
  EDIT_ITEM: "edit-item",
  DISPLAY_SIGNLE_ITEM: "/item",
  DISPLAY_ALL_ITEMS: "/all-items",
};

export const PICK_THEME = {
  THEME: "theme",
  DARK: "dark",
  LIGHT: "light",
};

export const COLLECT_IMG = "collectImg";
export const AVATAR = "avatar";

export const API_ENDPOINT = {
  SIGN_UP: "signup",
  SIGN_IN: "signin",
  SIGN_OUT: "signout",
  UPDATE_DELETE_USER: "users",
  CURRENT_USER: "current_user",
  ADMIN: {
    USERS: "admin/users",
    BLOCK_URL: "admin/users/block",
    UNBLOCK_URL: "admin/users/unblock",
    DELETE_URL: "admin/users/delete",
    ROLE_TOGGLE_URL: "admin/users/role_toggle",
  },
  COLLECTION: "collections",
  COLLECTION_CUSTOM_FIELDS: "collection/custom_fields",
  COLLECTION_ITEMS: "collection_items",
  ITEM: "items",
  TAG: "tags",
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
};

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
    CONFIRM: "Are you sure you want to delete selected users?",
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
  boolean: "True/False",
  date: "Date",
};

export const TOPICS = {
  EDUCATION: "Education",
  TECHNOLOGY: "Technology",
  TRAVEL: "Travel",
  HEALTH_AND_WELLNESS: "Health and Wellness",
  PHOTOGRAPHY: "Photography",
  FOOD_AND_COOKING: "Food and Cooking",
  FITNESS: "Fitness",
  HISTORY: "History",
  SCIENCE: "Science",
  FASHION: "Fashion",
  ART_AND_CRAFTS: "Art and Crafts",
  MUSIC: "Music",
  SPORTS: "Sports",
  NATURE_AND_WILDLIFE: "Nature and Wildlife",
  DIY_PROJECTS: "DIY Projects",
  HOME_DECOR: "Home Decor",
  GAMING: "Gaming",
  FINANCE_AND_INVESTMENT: "Finance and Investment",
  MOVIES_AND_TV_SHOWS: "Movies and TV Shows",
  GARDENING: "Gardening",
  MOTIVATION_AND_SELF_HELP: "Motivation and Self-Help",
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
