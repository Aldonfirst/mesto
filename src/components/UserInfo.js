export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      username: this._nameElement.textContent,
      job: this._infoElement.textContent,
    };

  }
  setUserInfo({ username, job, avatar }) {
    this._nameElement.textContent = username;
    this._infoElement.textContent = job;
    this._avatarElement.src = avatar;
  }

setMyId(id) {
  this._id = id
}

getMyId(){
  return this._id
}
}
