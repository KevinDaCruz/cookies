export const isAuthenticated = () => {
  const auth = localStorage.getItem("auth");
  if (!auth) return false;

  try {
    const { token, expiresAt } = JSON.parse(auth);
    return token && new Date(expiresAt) > new Date();
  } catch {
    return false;
  }
};
