export const addUser = (user) => ({
  type: "ADD_USER",
  payload: user,
});

export const editUser = (user) => ({
  type: "EDIT_USER",
  payload: user,
});

export const deleteUser = (userId) => ({
  type: "DELETE_USER",
  payload: userId,
});
