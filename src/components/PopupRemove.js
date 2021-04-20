import Popup from "./Popup.js";

export default class PopupRemove extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
    this.submitButton = this._form.querySelector(".popup__button");
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._idCard, this._cardRemove);
    });
  }
  open(idCard, cardRemove) {
    super.open();
    this._idCard = idCard;
    this._cardRemove = cardRemove;
  }
}
