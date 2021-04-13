import Popup from './Popup.js'
import {popupCaption, popupPicture} from '../utils/constants.js'

export default class PopupWithImage extends Popup {
    constructor({popupSelector}) {
        super({popupSelector});
    }

    setEventListeners() {
        super._setEventListeners();
    }

    openPopup(data) {
        super.openPopup()
        popupPicture.src = data.link;
        popupCaption.textContent = data.name;
        popupCaption.alt = data.name;
    }
}