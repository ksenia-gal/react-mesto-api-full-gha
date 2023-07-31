import React from "react";
import { Link } from "react-router-dom";
// создание компонента Register
function Register({ onRegister }) {
  // стейты регистрации
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  //очищение инпутов
  React.useEffect(() => {
    setPassword("");
    setEmail("");
  }, []);

  // обработчики
  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="auth">
      <p className="auth__title">Регистрация</p>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          required
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleEmail}
          placeholder="Email"
          className="auth__input"
          minLength="6"
          maxLength="40"
        />

        <input
          required
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handlePassword}
          placeholder="Пароль"
          className="auth__input"
          minLength="3"
          maxLength="10"
        />
        <button type="submit" className="auth__submit-button">
          Зарегистрироваться
        </button>
        <div className="auth__caption">
          <p className="auth__caption_text">Уже зарегистрированы? </p>
          <Link to="/sign-in" className="auth__caption_link">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Register;
