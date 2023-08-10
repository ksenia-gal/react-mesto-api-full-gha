import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/Api.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import ConfirmationPopup from "./ConfirmationPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddCardPopup from "./AddCardPopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { ProtectedRoute } from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";

function App() {
  // создание стейтов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    element: {},
  });
  const [selectedCardDeleteConfirmation, setSelectedCardDeleteConfirmation] =
    React.useState({ isOpen: false, card: {} });
  const [isSaving, setIsSaving] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const navigate = useNavigate();

  // эффект, проверяющий наличие токена и его валидность
  React.useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    //если у пользователя есть токен в localStorage, эта ф-я проверит, действующий он или нет
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      //проверим токен
      auth
        .checkToken(jwt)
        .then((res) => {
          // авторизуем пользователя
          setIsLoggedIn(true);
          setEmail(res.email);
          navigate("/", { replace: true });
        })
        .catch(console.error);
    }
  }

  // Функция регистрации пользователя + использование всплывающего окна
  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setStatus(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(`Возникла ошибка при регистрации пользователя, ${err}`);
        setStatus(false);
      })
      .finally(() => {
        setInfoTooltipOpen(true);
      })
  }

  // функция авторизации пользователя
  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmail(email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(`Возникла ошибка при авторизации, ${err}`);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  // эффект получения данных пользователя при загрузке страницы
  React.useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // эффект получения карточек при загрузке страницы
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // обработчик открытия попапа EditAvatarPopup
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // обработчик открытия попапа EditProfilePopup
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // обработчик открытия попапа AddCardPopup
  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  // обработчик увеличения изображения
  function handleCardClick(card) {
    setSelectedCard({ ...selectedCard, isOpen: true, element: card });
  }

  //  обработчик удаления карточки
  function handleDeleteCardClick(card) {
    setSelectedCardDeleteConfirmation({
      ...selectedCardDeleteConfirmation,
      isOpen: true,
      card: card,
    });
  }

  // обработчик закрытия всех попапов
  function closeAllPopups() {
    setInfoTooltipOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
    setSelectedCardDeleteConfirmation({
      ...selectedCardDeleteConfirmation,
      isOpen: false,
    });
  }

  // универсальная функция, принимающая функцию запроса
  function handleSubmit(request) {
    // измененние текста кнопки до вызова запроса
    setIsSaving(true);
    request()
      // закрытие попапа только в `then`
      .then(closeAllPopups)
      .catch(console.error)
      // возвращение исходного текста кнопки
      .finally(() => setIsSaving(false));
  }

  // обработчик изменения данных пользователя
  function handleUpdateUserData(newUserData) {
    function makeRequest() {
      return api
        .editProfile(newUserData)
        .then(setCurrentUser)
        .catch(console.error);
    }
    handleSubmit(makeRequest);
  }

  // обработчик изменения аватара
  function handleUpdateAvatar(newAvatarLink) {
    function makeRequest() {
      return api
        .changeAvatar(newAvatarLink)
        .then(setCurrentUser)
        .catch(console.error);
    }
    handleSubmit(makeRequest);
  }

  // обработчик добавления карточки
  function handleAddCardSubmit(cardData) {
    function makeRequest() {
      return api
        .addNewCard(cardData)
        .then((newCard) => {
          setCards([newCard, ...cards]);
        })
        .catch(console.error);
    }
    handleSubmit(makeRequest);
  }

  // обработчик лайков карточки
  function handleCardLike(card) {
    // проверка, есть ли лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((error) => console.log(`Ошибка: ${error}`));
    } else {
      api
        .putLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch(console.error);
    }
  }

  // функция удаления карточки
  function handleCardDelete(card) {
    function makeRequest() {
      return api
        .deleteCard(card._id)
        .then(() => {
          // создание копии массива c помощью метода filter с исключением из него удаленной карточки
          const newCards = cards.filter((item) =>
            item._id === card._id ? false : true
          );
          setCards(newCards);
        })
        .catch(console.error);
    }
    handleSubmit(makeRequest);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header
            email={email}
            isLoggedIn={isLoggedIn}
            onSignOut={handleSignOut}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddCardClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onDeletePlace={handleDeleteCardClick}
                  isRender={isSaving}
                />
              }
            />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path="/"
              element={
                isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>
          {isLoggedIn && <Footer />}
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            status={status}
            onClose={closeAllPopups}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUserData}
            isRender={isSaving}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isRender={isSaving}
          />
          <AddCardPopup
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddCardSubmit}
            isRender={isSaving}
          />
          <ConfirmationPopup
            deleteCard={selectedCardDeleteConfirmation}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            isRender={isSaving}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
