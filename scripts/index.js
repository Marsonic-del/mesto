import {Card, openPopup, closePopup} from './Card.js';
import {FormValidator, validationConfig} from './validate.js';
import {initialCards} from './initial-сards.js';

const addBtn = document.querySelector('.profile__add-button')
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAddCard = document.querySelector('.popup-add-card');
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
  const card = new Card(cardObject, ".element-template")
  const returnCardObj = card.generateCard();
  listContainerEl.prepend(returnCardObj);
  closePopup(popupAddCard);
}

//                          Слушатели и обработчики событий

// Открываем попап редактирования (popupe-edit-profile)
  popupOpenButton.addEventListener('click', () => {
   openPopup(popupEditProfile);
   const openedForm = document.querySelector('.popup_opened')
   const formValidation = new FormValidator(validationConfig, openedForm)
   formValidation.enableValidation ();
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
  const openedForm = document.querySelector('.popup_opened')
  const formValidation = new FormValidator(validationConfig, openedForm)
  formValidation.enableValidation ();
} );

// Добавляем карточку на страницу
formAddCard.addEventListener('submit', submitAddCardForm);

// Создаем карточки при загрузке страницы
initialCards.forEach((item) => {
  const cardItem = new Card(item, ".element-template");
  const cardElement = cardItem.generateCard();
  listContainerEl.append(cardElement);
})







 
















  

  
  