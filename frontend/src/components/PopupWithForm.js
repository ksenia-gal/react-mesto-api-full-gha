import React from "react";
import usePopupClose from "../hooks/usePopupClose";

// создание компонента PopupWithForm
function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  children,
  onSubmit,
}) {
  // Закрытие по кнопке Escape и оверлей
  usePopupClose(isOpen, onClose);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : false}`}
    >
      <div className="popup__overlay">
        <form className="form popup__container" name={name} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          <>{children}</>
          <button
            className={`popup__submit popup__submit_${name}`}
            type="submit"
          >
            {buttonText}
          </button>
          <button
            onClick={onClose}
            className="popup__close-button"
            type="button"
            aria-label="Закрыть форму"
          />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
