const addBtn = document.querySelector('.profile__add-button')
const popupContainer = document.querySelectorAll('.popup');
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const imagePopup = document.querySelector('.popup_image')
const popupPicture = document.querySelector('.popup__picture');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__button-close');
const heading = document.querySelector('.profile__heading');
const headingDescription = document.querySelector('.profile__heading-description');
const inputEditProfileName = popupEditProfile.querySelector('.popup__input_type_name');
const inputEditProfileAbout = popupEditProfile.querySelector('.popup__input_type_about');
const inputAddCardName = popupAddCard.querySelector('.popup__input_type_name');
const inputAddCardLink = popupAddCard.querySelector('.popup__input_type_link');
const listContainerEl = document.querySelector('.elements-list');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');
const inputList = Array.from(formAddCard.querySelectorAll('.popup__input'));
const buttonElement = formAddCard.querySelector('.popup__button');
const templateEl = document.querySelector('.element-template');
const closeButtonEditProfile = popupEditProfile.querySelector('.popup__button-close');
const closeButtonAddCard = popupAddCard.querySelector('.popup__button-close');
const closeButtonImage = imagePopup.querySelector('.popup__button-close');

  //                                          ФУНКЦИИ 

// Функция открытия попапа
function openPopup(popupName) {
    popupName.classList.add('popup_opened');
    //Закрываем попап клавишей escape
    document.addEventListener('keydown', closePopupByEscape);
}

// Сброс данных полей и ошибок после закрытия попапа
const resetPopupForm = (popupName) => {
  const form = popupName.querySelector('.popup__form');
  // Только для попапов с формами
  // popup_image не имеет формы поэтому не обрабатывается здесь
  if(form) {
    form.reset();
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass)
    })
  }
};

// Функция закрытия попапа
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  resetPopupForm(popupName);
  document.removeEventListener('keydown', closePopupByEscape);
}

// Функция закрытия попапов клавишей Esc 
const closePopupByEscape = function (evt) {
  if(evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

// Функция заполнения профиля через popupEditProfile
function submitEditProfileForm(evt) {
  evt.preventDefault();
  heading.textContent = inputEditProfileName.value;
  headingDescription.textContent = inputEditProfileAbout.value;
  closePopup(popupEditProfile);
}

// Функция загрузки карточек из массива
function renderInitialCards(arr) {
  const html = arr.map(getItem)
  listContainerEl.append(...html);
};

// Функция клонирования и заполнения темплейт-елемента
function getItem(item) {
  const cloneElement = templateEl.content.cloneNode(true);
  const elementPicture = cloneElement.querySelector('.element__picture');
  const elementName = cloneElement.querySelector('.element__name');
  const likeButton = cloneElement.querySelector('.element__button-like');
  const deleteButton = cloneElement.querySelector('.element__trash');
  elementPicture.src = item.link;
  elementPicture.alt = item.name;
  elementName.textContent = item.name;

  //Обработчик превью картинки 
  elementPicture.addEventListener('click', () => {
    handlePreviewPicture(item)
  })

  //Обработчик кнопки лайк
  likeButton.addEventListener('click', () => {
    handleLike(likeButton)
  })

  //Обработчик кнопки удаления картинки
  deleteButton.addEventListener('click', () => {
    handleDeleteCard(deleteButton)
  })
  return cloneElement;
}

// Функция открытия popup_image 
function handlePreviewPicture(data) {
  const popupCaption = imagePopup.querySelector('.popup__caption');
  popupCaption.textContent = data.name;
  popupPicture.src = data.link;
  popupPicture.alt = data.name;
  openPopup(imagePopup)
}

// Функция реагирования на нажатие кнопки "лайк" 
function handleLike(likeButton) {
  likeButton.classList.toggle('element__button-like_active');
}

// Функция добавления карточки из второго попапа
function submitAddCardForm(evt) {
  evt.preventDefault();
  const cardObject = {name: inputAddCardName.value, link: inputAddCardLink.value}
  const returnCardObj = getItem(cardObject);
  listContainerEl.prepend(returnCardObj);
  closePopup(popupAddCard);
  formAddCard.reset();
  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
}

//Функция удаления карточки
function handleDeleteCard(deleteButton) {
    const card = deleteButton.closest('.elements-list__item');
    card.remove();
}

// Закрытие попапов ("оверлей")
function closePopupOverlay () {
  const popupContainerArray = Array.from(popupContainer);
  popupContainerArray.forEach((popupElement) => {
    popupElement.addEventListener('click', (evt) => {
      if(evt.target === evt.currentTarget) {
        closePopup(evt.target);
      }
    })
  })
};

 //                          Слушатели и обработчики событий

// Открываем попап редактирования (popupe-edit-profile)
  popupOpenButton.addEventListener('click', () => {
   openPopup(popupEditProfile);
  inputEditProfileName.value = heading.textContent;
  inputEditProfileAbout.value = headingDescription.textContent;
  inputEditProfileName.dispatchEvent(new Event('input'));
  inputEditProfileAbout.dispatchEvent(new Event('input'));
} );

// Сохраняем введенную информацию в попапе редактирования (popupe-edit-profile)
formEditProfile.addEventListener('submit', submitEditProfileForm);

// Закрываем попап редактирования (popupe-edit-profile) кнопкой закрытия
closeButtonEditProfile.addEventListener('click', () => {
    closePopup(popupEditProfile);
  });

  // Закрываем попап добавления карточки (popupe-add-card) кнопкой закрытия
  closeButtonAddCard.addEventListener('click', () => {
    closePopup(popupAddCard);
  });

  // Закрываем popup_image кнопкой закрытия
  closeButtonImage.addEventListener('click', () => {
    closePopup(imagePopup);
  });

// Слушатель на кнопку открытия второго попапа (для добавления карточки).
addBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
} );

// Добавляем карточку на страницу
formAddCard.addEventListener('submit', submitAddCardForm);

// Загружаем карточки с массива
renderInitialCards(initialCards);

closePopupOverlay();





 
















  

  
  