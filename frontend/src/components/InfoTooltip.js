import React from "react";
import done from "../images/done.svg";
import failed from "../images/failed.svg";
import usePopupClose from "../hooks/usePopupClose";

// создание компонента InfoTooltip
function InfoTooltip(props) {
  // закрытие по Escape и оверлей
  usePopupClose(props.isOpen, props.onClose);

  return (
    <div
      className={`popup popup_type_tooltip ${
        props.isOpen ? "popup_opened" : false
      }`}
    >
      <div className="popup__overlay popup__overlay_tooltip">
        <div className="popup__container popup__container_tooltip">
          <img
            className="popup__image popup__tooltip_image"
            src={props.status ? done : failed}
            alt="Отображение результата операции"
          />
          <button
            onClick={props.onClose}
            className="popup__close-button"
            type="button"
            aria-label="Закрыть"
          />
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
