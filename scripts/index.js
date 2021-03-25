import Card from './Card.js';
import {FormValidator, validationConfig} from './FormValidator.js';
import {initialCards} from './initial-сards.js';

export {openPopup, imagePopup, listContainerEl, addBtn};

const addBtn = document.querySelector('.profile__add-button')
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const popupOpenButton = document.querySelector('.profile__edit-button');
//const popupCloseButton = popup.querySelector('.popup__button-close');
const heading = document.querySelector('.profile__heading');
const headingDescription = document.querySelector('.profile__heading-description');
const inputEditProfileName = popupEditProfile.querySelector('.popup__input_type_name');
const inputEditProfileAbout = popupEditProfile.querySelector('.popup__input_type_about');
const inputAddCardName = popupAddCard.querySelector('.popup__input_type_name');
const inputAddCardLink = popupAddCard.querySelector('.popup__input_type_link');
const listContainerEl = document.querySelector('.elements-list');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');
//const inputList = Array.from(formAddCard.querySelectorAll('.popup__input'));
//const buttonElement = formAddCard.querySelector('.popup__button');
//const templateEl = document.querySelector('.element-template');
const closeButtonEditProfile = popupEditProfile.querySelector('.popup__button-close');
const closeButtonAddCard = popupAddCard.querySelector('.popup__button-close');
const imagePopup = document.querySelector('.popup_image')
const closeButtonImage = imagePopup.querySelector('.popup__button-close');
const popupContainer = document.querySelectorAll('.popup');
const popupCaption = imagePopup.querySelector('.popup__caption');
const popupPicture = document.querySelector('.popup__picture');
const formArray = document.querySelectorAll('.popup__form');



  //                                          ФУНКЦИИ 

// Функция заполнения профиля через popupEditProfile
function submitEditProfileForm(evt) {
  evt.preventDefault();
  heading.textContent = inputEditProfileName.value;
  headingDescription.textContent = inputEditProfileAbout.value;
  closePopup(popupEditProfile);
}

// Функция добавления карточки из popupAddCard
function submitAddCardForm(evt) {
  evt.preventDefault();
  const cardObject = {name: inputAddCardName.value, link: inputAddCardLink.value}
  const card = createCard(cardObject, ".element-template")
  listContainerEl.prepend(card);
  closePopup(popupAddCard);
}

// Функция открытия попапа
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  //Закрываем попап клавишей escape
  document.addEventListener('keydown', closePopupByEscape);
}

// Функция закрытия попапов клавишей Esc 
const closePopupByEscape = function (evt) {
  if(evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

  // Закрываем popup_image кнопкой закрытия
  closeButtonImage.addEventListener('click', () => {
    closePopup(imagePopup);
  });

  // Функция закрытия попапа
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
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

function createCard(data, cardSelector) {
  const card = new Card(data, cardSelector);
  return card.generateCard();
}

export function handlePreviewPicture(title, image) {
  popupCaption.textContent = title;
  popupPicture.src = image;
  popupPicture.alt = title;
  openPopup(imagePopup)
} 

closePopupOverlay();

//                          Слушатели и обработчики событий

// Открываем попап редактирования (popupe-edit-profile)
  popupOpenButton.addEventListener('click', () => {
   openPopup(popupEditProfile);
   //const openedForm = document.querySelector('.popup_opened')
   //const formValidation = new FormValidator(validationConfig, openedForm)
   //formValidation.enableValidation ();
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

// Слушатель на кнопку открытия второго попапа (для добавления карточки).
addBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
  cardFormValidator.resetForm();
} );

// Добавляем карточку на страницу
formAddCard.addEventListener('submit', submitAddCardForm);

 // Создаем карточки при загрузке страницы
 initialCards.forEach((item) => {
  const cardElement = createCard(item, ".element-template")
  listContainerEl.append(cardElement);
})

const profileFormValidator = new FormValidator(validationConfig, formEditProfile);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, formAddCard);
cardFormValidator.enableValidation();