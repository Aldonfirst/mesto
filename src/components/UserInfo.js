export default class UserInfo {
    constructor({nameSelector, infoSelector}) {
      this._nameElement = document.querySelector(nameSelector);
      this._infoElement = document.querySelector(infoSelector);

    }
    getUserInfo() {
      return {
        username: this._nameElement.textContent,
        job: this._infoElement.textContent
      };

    }
  
    setUserInfo(data) {
      this._nameElement.textContent = data.username;
      this._infoElement.textContent = data.job;
    }
  }