export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, avatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userProfile = {
      userName: this._userName.textContent,
      userInfo: this._userInfo.textContent,
      userAvatar: this._userAvatar.src,
    };
    return this._userProfile;
  }

  setUserInfo(data) {
    if (data.name) {
      this._userName.textContent = data.name;
    }
    if (data.about) {
      this._userInfo.textContent = data.about;
    }
    if (data.avatar) {
      this._userAvatar.src = data.avatar;
    }
  }
}
