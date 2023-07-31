import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import useForm from "../hooks/useForm.js";

// создание компонента AddCardPopup
function AddCardPopup({ isOpen, onClose, onAddPlace, isRender }) {
  const { values, handleChange, setValues } = useForm({ name: "", link: "" });

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(values);
  }

  React.useEffect(() => {
    setValues({ name: "", link: "" });
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="placeForm"
      isOpen={isOpen}
      buttonText={isRender ? "Сохранение..." : "Создать"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={values.name}
        onChange={handleChange}
        id="card-name-input"
        type="text"
        className="popup__input popup__input_place-name"
        placeholder="Введите название"
        name="name"
        minLength="2"
        maxLength="30"
        required
      />
      <span id="card-name-input-error" className="popup__input-error"></span>
      <input
        value={values.link}
        onChange={handleChange}
        id="link-input"
        type="url"
        className="popup__input popup__input_image"
        placeholder="Введите ссылку на изображение"
        name="link"
        required
      />
      <span id="link-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddCardPopup;
