import { useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useChangePasswordMutation } from "../api/changePasswordApiSlice";

const PWD_REGEX = /^(?=.*[A-Z]).{4,10}$/;

const ChangePassword = () => {
  const [oldPwd, setOldPwd] = useState("");
  const [validOldPwd, setValidOldPwd] = useState(false);
  const [oldPwdFocus, setOldPwdFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [changePassword] = useChangePasswordMutation();

  useEffect(() => {
    setValidOldPwd(PWD_REGEX.test(oldPwd));
  }, [oldPwd]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [oldPwd, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (oldPwd !== pwd) {
      try {
        await changePassword({ oldPwd, newPwd: pwd }).unwrap();
        setSuccess(true);
        setOldPwd("");
        setPwd("");
        setMatchPwd("");
      } catch (err) {
        if (!err?.originalStatus) {
          setErrMsg("Ошибка сервера");
        } else {
          setErrMsg("Ошибка смены пароля");
        }
      }
    } else {
      setErrMsg("Старый пароль и новый пароль не должны совпадать!");
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h3>Пароль успешно изменен!</h3>
          <br />
          <p>
            <Link to="/">Главная</Link>
          </p>
        </section>
      ) : (
        <section>
          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <h1>Смена пароля</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Старый пароль:
              <FontAwesomeIcon
                icon={faCheck}
                className={validOldPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validOldPwd || !oldPwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="old_password"
              autoComplete="off"
              onChange={(e) => setOldPwd(e.target.value)}
              value={oldPwd}
              required
              aria-invalid={validOldPwd ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setOldPwdFocus(true)}
              onBlur={() => setOldPwdFocus(false)}
            />
            <p
              id="uidnote"
              className={
                oldPwdFocus && oldPwd && !validOldPwd
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Должно быть от 4 до 10 символов.
              <br />
              Должен содержать заглавную букву.
            </p>

            <label htmlFor="new_password">
              Новый пароль:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="new_password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Должно быть от 4 до 10 символов.
              <br />
              Должен содержать заглавную букву.
            </p>

            <label htmlFor="confirm_pwd">
              Повторите пароль:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Пароли не совпадают.
            </p>

            <button
              disabled={!validOldPwd || !validPwd || !validMatch ? true : false}
            >
              Сменить
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default ChangePassword;
