import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Drawer = (props) => {
  const { isAuth } = useAuth();

  return (
    <nav className={`drawer ${!props.isOpen && "close"}`}>
      <ul>
        {isAuth ? (
          <>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="change-password">Поменять пароль</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="register">Регистрация</Link>
            </li>
            <li>
              <Link to="auth">Войти</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Drawer;
