export class UserInfo {
  constructor({ username, useroccupation, avatar }) {
    this._username = document.querySelector(username);
    this._useroccupation = document.querySelector(useroccupation);
    this._profileAvatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      username: this._username.textContent,
      useroccupation: this._useroccupation.textContent,
    };
  }

  setUserInfo({username, useroccupation}) {
    this._username.textContent = username;
    this._useroccupation.textContent = useroccupation;
  }

  setUserAvatar(user) {
    this._profileAvatar.src = user.avatar;
  }
}