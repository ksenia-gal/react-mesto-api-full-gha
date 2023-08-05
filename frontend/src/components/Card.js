import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

// создание компонента Card
function Card(props) {
  // подписка на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);
  // проверка, является ли пользователь владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // проверка, есть ли у карточки лайк текущего пользователя
  const _likedCard = props.card.likes.some(
    (item) => item === currentUser._id
  );
  const cardLikeButton = `element__like-button ${
    _likedCard ? "element__like-button_active" : ""
  }`;

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      <img
        className="element__image"
        src={props.card.link}
        alt={`Фотография ${props.card.name}`}
        onClick={handleCardClick}
      />
      {isOwn && (
        <button
          className="element__delete-button"
          type="button"
          aria-label="Значок корзины"
          onClick={handleDeleteClick}
        />
      )}
      <div className="element__block">
        <p className="element__title">{props.card.name}</p>
        <div className="element__like-block">
          <button
            className={cardLikeButton}
            type="button"
            aria-label="Изображение сердца"
            onClick={handleLikeClick}
          />
          <p className="element__count-like">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
