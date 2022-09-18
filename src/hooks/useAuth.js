import { useSelector } from "react-redux";

const useAuth = () => {
  const { token } = useSelector((state) => state.auth);

  return {
    isAuth: !!token,
    token,
  };
};

export default useAuth;
