const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

class FormValidator {
    constructor(config, form) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._element = form;
        this._submitButton = this._element.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
    };

    _setEventListeners () {
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._resetPopupForm (this._inputList)
        this._toggleButtonState(this._inputList);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid (inputElement)
                this._toggleButtonState(this._inputList);
            })
        })
    }

    _isValid (inputElement)  {
        if(!inputElement.validity.valid) {
            this._showInputError (inputElement)
        } else {        
            this._hideInputError(inputElement)
        };
    };

    _showInputError (inputElement) {
        this._errorElement = this._element.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.classList.add(this._errorClass);
        this._errorElement.textContent = inputElement.validationMessage;
    };

    _hideInputError (inputElement) {
        this._errorElement = this._element.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    };

    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
       });
    };

    _toggleButtonState (inputList) {
        if (this._hasInvalidInput(inputList)) {
            // сделай кнопку неактивной
            this._submitButton.classList.add(this._inactiveButtonClass);     
          } else {
            // иначе сделай кнопку активной
            this._submitButton.classList.remove(this._inactiveButtonClass);
          }
    };

    _resetPopupForm (inputList) {
      this._popupOpened = document.querySelector('.popup_opened');
      this._openedForm = this._popupOpened.querySelector(this._formSelector);
      this._openedForm.reset();
      inputList.forEach((inputElement) => {
        this._hideInputError(inputElement)
      })
    };

    enableValidation () {this._setEventListeners ()};
}

export {FormValidator, validationConfig}



