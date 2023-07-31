import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import useForm from "../hooks/useForm.js";

// создание компонента EditAvatarPopup
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isRender }) {
  const { values, handleChange, setValues } = useForm();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(values.avatar);
  }

  // эффект очистки формы
  React.useEffect(() => {
    setValues({ avatar: "" });
  }, [isOpen, setValues]);

  return (
    <PopupWithForm
      name="avatarForm"
      title="Обновить аватар"
      isOpen={isOpen}
      buttonText={isRender ? "Сохранение..." : "Сохранить"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={values.avatar || ""}
        onChange={handleChange}
        id="new-avatar-input"
        type="url"
        className="popup__input popup__input_new-avatar"
        placeholder="Ссылка на изображение"
        name="avatar"
        required
      />
      <span
        id="new-avatar-input-error"
        className="new-avatar-input-error popup__input-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
