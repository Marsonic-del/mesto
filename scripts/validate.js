//Функция для стилизации уведомлений о неправильно заполненных полей формы
const showInputError = (formElement, inputElement, errorMessage) => {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.classList.add('popup__error_visible');
    errorElement.textContent = errorMessage;
};

//Функция удаляет уведомления о неправильно заполненных полях формы
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
};

//Функция проверяет правильно ли заполненны поля формы. Если нет, показывает соответствующее уведомление.
//Если да, удаляет это уведомление.
const isValid = (formElement,inputElement) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideInputError(formElement, inputElement)
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
const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add('popup__button_disabled');
      
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove('popup__button_disabled');
    }
  }; 

// Функция устанавливает слушатель события addEventListener('input', () => {}) в каждое поле 
// передаваемой ей формы.
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const submitButtonSelector = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, submitButtonSelector);
    })
});
};

// Функция исполняет весь процес валидации формы.
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formSelector) => {
        formSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formSelector);
    });
};

// Запускаем валидацию
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
