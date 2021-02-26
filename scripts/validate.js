//Функция для стилизации уведомлений о неправильно заполненных полей формы
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
};

//Функция удаляет уведомления о неправильно заполненных полях формы
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

//Функция проверяет правильно ли заполненны поля формы. Если нет, показывает соответствующее уведомление.
//Если да, удаляет это уведомление.
const isValid = (formElement,inputElement, inputErrorClass, errorClass) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass)
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass)
    };
};

//Функция проверяет наличие в форме хотя бы одного неправильно заполненого поля.
//Возвращает true если находит либо false  в противном случае.
const hasInvalidInput = (inputArray) => {
    return inputArray.some((inputElement) => {
         return !inputElement.validity.valid;
    });
};

//В зависимости от возвращаемого значения функции hasInvalidInput() делает кнопку отправки формы
// активной либо неактивной.
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(inactiveButtonClass);     
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }; 

// Функция устанавливает слушатель события addEventListener('input', () => {}) в каждое поле 
// передаваемой ей формы.
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, submitButton, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, submitButton, inactiveButtonClass);
    })
});
};

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

// Функция исполняет весь процес валидации формы.
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formSelector) => {
        formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    });
};

// Запускаем валидацию
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation(validationConfig);
