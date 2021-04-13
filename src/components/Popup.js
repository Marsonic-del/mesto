export default class Popup {
    constructor({popupSelector}) {
        this._popupSelector = document.querySelector(popupSelector);
        this._closeButton = this._popupSelector.querySelector('.popup__button-close');
    }
    
    openPopup() {
        this._popupSelector.classList.add('popup_opened');
        this._escapeClose = this._handleEscClose.bind(this)
        document.addEventListener('keydown', this._escapeClose);
    }

    closePopup() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._escapeClose);
    }

    _closePopupOverlay() {
        this._popupSelector.addEventListener('click', (evt) => {
            if(evt.target === evt.currentTarget) {
              this.closePopup();
            }
          })
        }

    _handleEscClose(evt) {
        if(evt.key === "Escape") {
            this.closePopup()
          }
    }
    
    _setEventListeners() { 
        this._closeButton.addEventListener('click', this.closePopup.bind(this))
        this._closePopupOverlay()
    }
}