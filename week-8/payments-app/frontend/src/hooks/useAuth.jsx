const useAuth = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return isLoggedIn;
};

export default useAuth;
