import Popup from "./Popup.js";

export default class PopupRemove extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector(".popup__form");
  }
  setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.closePopup();
    });
  }
  openPopup() {
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
  }
}
