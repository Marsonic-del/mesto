export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, avatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._userAvatar = document.querySelector(avatarSelector);
    this._popupSelector = document.querySelector('.popup-edit-profile');
    this._form = this._popupSelector.querySelector('.popup__form');
  }

  getUserInfo() {
    this._userProfile = {
      userName: this._userName.textContent,
      userInfo: this._userInfo.textContent,
      userAvatar: this._userAvatar.src,
    };
    return this._userProfile;
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._form.querySelectorAll('.popup__input');

    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}
