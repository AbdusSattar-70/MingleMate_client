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
  USERS: "/users",
};

export const REGEX_PICK = {
  USER_REGEX: /^[A-Za-z][A-Za-z0-9_ -]{0,23}$/,
  PWD_REGEX: /.{6,}/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export const RES_TYPE = {
  OK: "OK",
};

export const AUTH_MESSAGES = {
  CONFIRM_PWD: " Must match the first password input field.",
  VALID_NAME_NOTE:
    " Must begin with a letter. Letters, numbers, underscores, hyphens allowed.",
  EMAIL_NOTE: "Please enter a valid email address.",
  PWD_NOTE:
    "At least six characters. Letters, numbers, underscores, hyphens allowed",
  TRY_AGAIN:
    "Unable to process the request at this moment, Please try again later.",
  SUCCESS: "Congrats! Request has Succeeded",
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
};
