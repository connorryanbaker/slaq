export const CLEAR_USERS = "CLEAR_USERS";

export const clearUsers = currentUser => ({
  type: CLEAR_USERS,
  currentUser
});