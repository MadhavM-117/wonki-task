export const useAuth = () => {
  const user = localStorage.getItem("user");

  if (user) return { user: JSON.parse(user) };

  return {};
};
