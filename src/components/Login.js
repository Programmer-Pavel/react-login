import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../api/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, pwd }).unwrap();
      dispatch(setCredentials({ ...userData, email }));
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg("Ошибка сервера");
      } else if (err.originalStatus === 400) {
        setErrMsg("Пропущен email или пароль");
      } else if (err.originalStatus === 401) {
        setErrMsg("Неверный email или пароль");
      } else {
        setErrMsg("Ошибка авторизации");
      }
    }
  };

  return (
    <section>
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Войти</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username"> Email:</label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Войти</button>
      </form>
      <p>
        Хотите зарегистрироваться?
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/register">Регистрация</Link>
        </div>
      </p>
    </section>
  );
};

export default Login;
