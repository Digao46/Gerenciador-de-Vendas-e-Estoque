export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user")!);

  if (!user.token) return false;

  return true;
};

export const isAuthorizated = () => {
  const user = JSON.parse(localStorage.getItem("user")!);

  return user.isAdmin;
};
