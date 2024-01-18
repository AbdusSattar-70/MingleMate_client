export const canManageAll = (
  userId: string,
  userRole: number,
  author_id: string
): boolean => {
  return userId === author_id || userRole === 2;
};
