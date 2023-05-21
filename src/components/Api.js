
export default class Api {
  constructor(options) {
    this._baseUrl = options.url;
    this._headers = options.headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
//метод профиля
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then (this._checkResponse);
  }
  editProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
       method: 'PATCH',
       headers: this._headers,
       body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
     })
     .then( this._checkResponse);
  }
 //метод карточек
getInitialCards() {
  return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers
  })
  .then(this._checkResponse);
}
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name:data.name,
        link:data.link
      })
    })
    .then (this._checkResponse);
  }

  deleteMyCard(cardId) {
  return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  .then(this._checkResponse);
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar:data.avatar
      })
    })
    .then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
}


