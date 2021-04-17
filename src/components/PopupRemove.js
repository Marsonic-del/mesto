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
      this._handleFormSubmit(this._idCard, this._cardRemove);
      this.closePopup();
    });
  }
  openPopup(idCard, cardRemove) {
    super.openPopup();
    this._idCard = idCard;
    this._cardRemove = cardRemove;
  }

  closePopup() {
    super.closePopup();
  }
}
