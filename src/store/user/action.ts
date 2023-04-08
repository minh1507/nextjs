export const usersActionTypes = {
  ADD_USER: "ADD_USER",
};

export const addUser = (user: any) => {
  return { type: usersActionTypes.ADD_USER, user: user };
};
