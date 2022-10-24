export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user")!);

  console.log(user);
};

export const isAuthorizated = () => {
  const user = JSON.parse(localStorage.getItem("user")!);

  return user.isAdmin;
};
