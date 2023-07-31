import React from "react";

// создание компонента Login
function Login({ onLogin }) {
  // стейты авторизации
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
    onLogin(email, password);
  }

  return (
    <div className="auth">
      <p className="auth__title">Вход</p>
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
          minLength="6"
          maxLength="10"
        />
        <button type="submit" className="auth__submit-button">
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
