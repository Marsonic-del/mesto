export default class FormValidator {
    constructor(config, form) {
        //this._formSelector = config.formSelector;
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
        this.resetForm (this._inputList)
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
            // сделаем кнопку неактивной
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;     
          } else {
            // иначе сделаем кнопку активной
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
          }
    };

    resetForm () {
        this._element.reset();
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
          this._toggleButtonState (this._inputList)
      })
    };

    enableValidation () {this._setEventListeners ()};
}



