import React from "react";
import usePopupClose from "../hooks/usePopupClose.js";

// создание компонента ImagePopup
function ImagePopup({
  onClose,
  card: {
    isOpen,
    element: { name, link },
  },
}) {
  // закрытие по Escape и оверлей
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_zoom ${isOpen ? "popup_opened" : false}`}>
      <div className="popup__overlay popup__overlay_zoom">
        <div className="popup__container popup__container_zoom">
          <img className="popup__image" src={link} alt={`Фото ${name}`} />
          <p className="popup__caption">{name}</p>
          <button
            onClick={onClose}
            className="popup__close-button"
            type="button"
            aria-label="Закрыть"
          />
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
