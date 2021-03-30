import Popup from './Popup.js'
import {popupCaption, popupPicture} from '../pages/index.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    openPopup(title, image) {
        super.openPopup()
        popupPicture.src = image;
        popupCaption.textContent = title;
        popupCaption.alt = title;
    }
}