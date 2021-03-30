import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js'
import Popup from '../components/Popup.js'
import {initialCards} from '../utils/constants.js'
import PopupWithImage from '../components/PopupWithImage.js';
export {popupCaption, popupPicture, imagePopupHandler}

const addBtn = document.querySelector('.profile__add-button')
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const popupOpenButton = document.querySelector('.profile__edit-button');
const heading = document.querySelector('.profile__heading');
const headingDescription = document.querySelector('.profile__heading-description');
const inputEditProfileName = popupEditProfile.querySelector('.popup__input_type_name');
const inputEditProfileAbout = popupEditProfile.querySelector('.popup__input_type_about');
const inputAddCardName = popupAddCard.querySelector('.popup__input_type_name');
const inputAddCardLink = popupAddCard.querySelector('.popup__input_type_link');
const listContainerEl = document.querySelector('.elements-list');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');
const closeButtonEditProfile = popupEditProfile.querySelector('.popup__button-close');
const closeButtonAddCard = popupAddCard.querySelector('.popup__button-close');
const imagePopup = document.querySelector('.popup_image')
const closeButtonImage = imagePopup.querySelector('.popup__button-close');
const popupContainer = document.querySelectorAll('.popup');
const popupCaption = imagePopup.querySelector('.popup__caption');
const popupPicture = document.querySelector('.popup__picture');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
const profileFormValidator = new FormValidator(validationConfig, formEditProfile);
const cardFormValidator = new FormValidator(validationConfig, formAddCard);
const popupAddCardHandler = new Popup(popupAddCard);
const popupEditProfileHandler = new Popup(popupEditProfile) 
const imagePopupHandler = new PopupWithImage(imagePopup)

  //                                          ФУНКЦИИ 

// Функция заполнения профиля через popupEditProfile
function submitEditProfileForm(evt) {
  evt.preventDefault();
  heading.textContent = inputEditProfileName.value;
  headingDescription.textContent = inputEditProfileAbout.value;
  popupEditProfileHandler.closePopup();
}

// Функция добавления карточки из popupAddCard
function submitAddCardForm(evt) {
  evt.preventDefault();
  const cardObject = {name: inputAddCardName.value, link: inputAddCardLink.value}
  const card = createCard(cardObject, ".element-template")
  listContainerEl.prepend(card);
  popupAddCardHandler.closePopup();
}

// Функция открытия попапа
/*function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  //Закрываем попап клавишей escape
  document.addEventListener('keydown', closePopupByEscape);
}*/

// Функция закрытия попапов клавишей Esc 
/*const closePopupByEscape = function (evt) {
  if(evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}*/

  /*// Закрываем popup_image кнопкой закрытия
  closeButtonImage.addEventListener('click', () => {
    closePopup(imagePopup);
  });*/

  // Функция закрытия попапа
/*function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}*/

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

// Функция создания карточки
function createCard(data, cardSelector) {
  const card = new Card(data, cardSelector);
  return card.generateCard();
}

/*// Функция заполнения данными попапа превью карточки
export function handlePreviewPicture(title, image) {
  popupCaption.textContent = title;
  popupPicture.src = image;
  popupPicture.alt = title;
  imagePopupHandler.openPopup();
} */

// Вызов функции закрытия попапов оверлей
closePopupOverlay();



//                          Слушатели событий

// Открываем попап редактирования (popupe-edit-profile)
  popupOpenButton.addEventListener('click', () => {
   popupEditProfileHandler.openPopup();
   inputEditProfileName.value = heading.textContent;
   inputEditProfileAbout.value = headingDescription.textContent;
   inputEditProfileName.dispatchEvent(new Event('input'));
   inputEditProfileAbout.dispatchEvent(new Event('input'));
} );

// Сохраняем введенную информацию в попапе редактирования (popupe-edit-profile)
formEditProfile.addEventListener('submit', submitEditProfileForm);

/*// Закрываем попап редактирования (popupe-edit-profile) кнопкой закрытия
closeButtonEditProfile.addEventListener('click', () => {
    closePopup(popupEditProfile);
  });*/

  

// Слушатель на кнопку открытия второго попапа (для добавления карточки).
addBtn.addEventListener('click', () => {
  popupAddCardHandler.openPopup();
  cardFormValidator.resetForm();
} );

/*// Закрываем попап добавления карточки (popupe-add-card) кнопкой закрытия
closeButtonAddCard.addEventListener('click', () => {
  popupAddCardHandler.closePopup();
});*/

// Добавляем карточку на страницу
formAddCard.addEventListener('submit', submitAddCardForm);

 // Создаем карточки при загрузке страницы
 /*initialCards.forEach((item) => {
  const cardElement = createCard(item, ".element-template")
  listContainerEl.append(cardElement);
})*/

const cardList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, ".element-template");
  const cardElement = card.generateCard();
  cardList.addItem(cardElement)
}}, listContainerEl)

cardList.renderItems();

// Создаем обьекты класса FormValidator для формы редактирования и формы добавления карточки
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();