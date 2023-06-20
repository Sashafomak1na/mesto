export class UserInfo {
  constructor({ username, useroccupation }) {
    this._username = document.querySelector(username);
    this._useroccupation = document.querySelector(useroccupation);
  }

  getUserInfo() {
    return {
      username: this._username.textContent,
      useroccupation: this._useroccupation.textContent,
    };
  }

  setUserInfo(data) {
    this._username.textContent = data.username;
    this._useroccupation.textContent = data.useroccupation;
  }
}