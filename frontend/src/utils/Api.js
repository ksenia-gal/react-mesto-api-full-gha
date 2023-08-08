class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
  }

  // Формирую запрос на сервер, если прошел не удачно, возвращаем ошибку!
  _checkResponse(res) {
    if (res.ok) {
      return Promise.resolve(res.json())
    }

    // Если ошибка пришла, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  // Метод загрузки информации о пользователе с сервера
  async getUserData() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._checkResponse(response)
  }
  
  //Метод загрузки карточек с сервера
  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._checkResponse(response)
  }

  // Метод редактирование профиля
  async editProfile(profileData) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about,
      }),
    })
    return this._checkResponse(response)
  }

  //Метод добавления новой карточки
  async addNewCard(cardData) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(cardData),
    })
    return this._checkResponse(response)
  }

  // Метод постановки лайка карточки
  async putLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._checkResponse(response)
  }

  // Метод удаления карточки
  async deleteCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._checkResponse(response)
  }

  // Метод постановки и снятия лайка с карточки
  async deleteLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    return this._checkResponse(response)
  }
  
  // Метод обновления аватара пользователя
  async changeAvatar(src) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        avatar: src,
      }),
    })
    return this._checkResponse(response)
  }
}

const api = new Api({
 baseUrl: "https://kseniagal-backend.nomoreparties.co",
})

export default api

// class Api {
//   constructor({ baseUrl, headers }) {
//     this._baseUrl = baseUrl;
//     // this._userUrl = `${this._baseUrl}/users/me`;
//     this._headers = headers;
//   }

//   // обработка ответа сервера
//   _checkResponse(res) {
//     if (res.ok) {
//       return Promise.resolve(res.json());
//     } else {
//       return Promise.reject(`Ошибка: ${res.status}`);
//     }
//   }

//   // универсальный метод запроса с проверкой ответа
//   _request(endpoint, options) {
//     const url = `${this._baseUrl}/${endpoint}`;
//     return fetch(url, options).then(this._checkResponse);
//   }

//   // загрузка информации о пользователе с сервера
//   async getUserData() {
//     const response = await this._request("users/me", {
//       headers: this._headers,
//     });
//     return response;
//   }

//   // загрузка карточек с сервера
//   async getInitialCards() {
//     const response = await this._request("cards", { headers: this._headers });
//     return response;
//   }

//   // редактирование профиля
//   async editProfile(profileData) {
//     const response = await this._request("users/me", {
//       method: "PATCH",
//       headers: this._headers,
//       body: JSON.stringify({
//         name: profileData.name,
//         about: profileData.about,
//       }),
//     });
//     return response;
//   }
//   // добавление новой карточки
//   async addNewCard(cardData) {
//     const response = await this._request("cards", {
//       method: "POST",
//       headers: this._headers,
//       body: JSON.stringify(cardData),
//     });
//     return response;
//   }

//   // постановка лайка
//   async putLike(cardId) {
//     const response = await this._request(`cards/${cardId}/likes`, {
//       method: "PUT",
//       headers: this._headers,
//     });
//     return response;
//   }

//   // удаление лайка
//   async deleteLike(cardId) {
//     const response = await this._request(`cards/${cardId}/likes`, {
//       method: "DELETE",
//       headers: this._headers,
//     });
//     return response;
//   }

//   // удаление карточки
//   async deleteCard(cardId) {
//     const response = await this._request(`cards/${cardId}`, {
//       method: "DELETE",
//       headers: this._headers,
//     });
//     return response;
//   }

//   // обновление аватара пользователя
//   async changeAvatar(src) {
//     const response = await this._request(`users/me/avatar`, {
//       method: "PATCH",
//       headers: this._headers,
//       body: JSON.stringify({
//         avatar: src,
//       }),
//     });
//     return response;
//   }
// }

// // создание экземпляра класса Api
// const api = new Api({
//   // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65",
//   baseUrl: "https://kseniagal-backend.nomoreparties.co",
//   headers: {
//     authorization: `Bearer ${localStorage.getItem("jwt")}`,
//     "Content-Type": "application/json",
//   },
// });

// export default api;