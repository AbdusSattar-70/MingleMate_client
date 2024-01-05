import { CustomFieldKey, TopicKey } from "./types";

export const BASE_URL = "http://localhost:4000";
export const AXIOS_HEADERS = { "Content-Type": "application/json" };

export const PICK_THEME = {
  THEME: "theme",
  DARK: "dark",
  LIGHT: "light",
};

export const API_ENDPOINT = {
  SIGN_UP: "signup",
  SIGN_IN: "signin",
  SIGN_OUT: "signout",
  CURRENT_USER: "current_user",
  ADMIN: {
    USERS: "admin/users",
    BLOCK_URL: "admin/users/block",
    UNBLOCK_URL: "admin/users/unblock",
    DELETE_URL: "admin/users/delete",
    ROLE_TOGGLE_URL: "admin/users/role_toggle",
  },
  COLLECTION: "collections",
};

export const REGEX_PICK = {
  USER_REGEX: /^[A-Za-z][A-Za-z0-9_ -]{0,23}$/,
  PWD_REGEX: /.{6,}/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const RES_TYPE = {
  OK: "OK",
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

export const FILTER_BY = {
  ADMIN: "admin",
  BLOCKED: "blocked",
  GENERAL: "general",
  ACTIVE: "active",
};

export const FILTERS = {
  [FILTER_BY.ADMIN]: { role: 2 },
  [FILTER_BY.GENERAL]: { role: 1 },
  [FILTER_BY.BLOCKED]: { blocked: true },
  [FILTER_BY.ACTIVE]: { blocked: false },
};

export const CustomFieldType: Record<CustomFieldKey, string> = {
  string: "Single line text",
  text: "Multi-line text or description type",
  number: "Number",
  boolean: "True/False",
  date: "Date",
};

export const TOPICS: Record<TopicKey, string> = {
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
