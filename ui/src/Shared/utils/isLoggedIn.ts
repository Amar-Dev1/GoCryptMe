export const isLoggedIn = () => {
  return sessionStorage.getItem("loggedInUser") === "true";
};