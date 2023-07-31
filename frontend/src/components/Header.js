import React from "react";
import headerLogoPath from "../images/header__logo.svg";
import { Link, Routes, Route } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img
        src={headerLogoPath}
        alt="Логотип заголовка"
        className="header__logo"
      />
      <Routes>
        <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>}/>
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>}/>
        <Route exact path="/" element={ <div className="header__menu">
          <p className="header__email">{props.email}</p>
          <Link
            to="/sign-in"
            className="header__link"
            onClick={props.onSignOut}
          >
            Выйти
          </Link>
        </div>}/>
      </Routes>
    </header>
  );
}
export default Header;