export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector
        this._closeButton = this._popupSelector.querySelector('.popup__button-close');
    }
    
    openPopup() {
        this._popupSelector.classList.add('popup_opened');
        this.setEventListeners();
        this._escapeClose = this._handleEscClose.bind(this)
        document.addEventListener('keydown', this._escapeClose);
    }

    closePopup() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._escapeClose);
    }

    _handleEscClose(evt) {
        if(evt.key === "Escape") {
            this.closePopup()
          }
    }
    
    setEventListeners() { 
        this._closeButton.addEventListener('click', this.closePopup.bind(this))
    }
}