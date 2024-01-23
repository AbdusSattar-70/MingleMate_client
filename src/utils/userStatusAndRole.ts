export const defineUserStatus = (blocked: boolean) => {
  return blocked === false ? "Active" : "Blocked";
};

export const defineUserRole = (role: number) => {
  return role === 1 ? "Reqular" : "Admin";
};
