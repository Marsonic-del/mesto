import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._popupPicture = this._popupElement.querySelector(".popup__picture");
    this._popupCaption = this._popupElement.querySelector(".popup__caption");
  }

  open(data) {
    super.open();
    this._popupPicture.src = data.link;
    this._popupCaption.textContent = data.name;
    this._popupCaption.alt = data.name;
  }
}
