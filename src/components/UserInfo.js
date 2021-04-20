export default class UserInfo {
  constructor(config) {
    this._userName = document.querySelector(config.userNameSelector);
    this._userInfo = document.querySelector(config.userAboutSelector);
    this._userAvatar = document.querySelector(config.userAvatarSelector);
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
