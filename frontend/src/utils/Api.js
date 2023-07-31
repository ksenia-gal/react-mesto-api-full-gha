class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._token = headers["authorization"];
    this._headers = headers;
  }

  // обработка ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // универсальный метод запроса с проверкой ответа
  _request(endpoint, options) {
    const url = `${this._baseUrl}/${endpoint}`;
    return fetch(url, options).then(this._checkResponse);
  }

  // загрузка информации о пользователе с сервера
  async getUserData() {
    const response = await this._request("users/me", {
      headers: {
        authorization: this._token,
      },
    });
    return response;
  }

  // загрузка карточек с сервера
  async getInitialCards() {
    const response = await this._request("cards", { headers: this._headers });
    return response;
  }

  // редактирование профиля
  async editProfile(profileData) {
    const response = await this._request("users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about,
      }),
    });
    return response;
  }
  // добавление новой карточки
  async addNewCard(cardData) {
    const response = await this._request("cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    });
    return response;
  }

  // постановка лайка
  async putLike(cardId) {
    const response = await this._request(`cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    return response;
  }

  // удаление лайка
  async deleteLike(cardId) {
    const response = await this._request(`cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    return response;
  }

  // удаление карточки
  async deleteCard(cardId) {
    const response = await this._request(`cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return response;
  }

  // обновление аватара пользователя
  async changeAvatar(src) {
    const response = await this._request(`users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: src,
      }),
    });
    return response;
  }
}

// создание экземпляра класса Api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "dc4cc6fb-4780-4de8-be6c-e7f4fd89da24",
    "Content-Type": "application/json",
  },
});

export default api;
