import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super({popupSelector});
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector('.popup__form')
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

    setEventListeners() {
        super._setEventListeners();  
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.closePopup();   
        });
    }

    openPopup() {
        super.openPopup();
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}