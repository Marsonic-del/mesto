import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import {
  initialCards,
  validationConfig,
  formAddCard,
  formEditProfile,
  listContainerEl,
  popupOpenButton,
  addBtn,
  inputEditProfileName,
  inputEditProfileAbout,
  heading,
  headingDescription,
} from './utils/constants.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import './pages/index.css';

const cardFormValidator = new FormValidator(validationConfig, formAddCard);
const profileFormValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
const userInfo = new UserInfo({
  userNameSelector: '.profile__heading',
  userInfoSelector: '.profile__heading-description',
});
const imagePopupHandler = new PopupWithImage({ popupSelector: '.popup_image' });
const popupEditProfileForm = new PopupWithForm({
  popupSelector: '.popup-edit-profile',
  handleFormSubmit: formValues => {
    userInfo.setUserInfo(formValues);
    popupEditProfileForm.closePopup();
  },
});

const popupAddCardForm = new PopupWithForm({
  popupSelector: '.popup-add-card',
  handleFormSubmit: formValues => {
    const newCard = createCard(formValues, '.element-template');
    cardList.addItemPrepend(newCard);
  },
});
popupAddCardForm.setEventListeners();
popupEditProfileForm.setEventListeners();
imagePopupHandler.setEventListeners();

//                                          ФУНКЦИИ
// Функция создания карточки
function createCard(data, cardSelector) {
  const card = new Card(
    {
      handleCardClick: () => {
        imagePopupHandler.openPopup(data);
      },
    },
    data,
    cardSelector
  );
  return card.generateCard();
}

//                          Слушатели событий

// Открываем попап редактирования (popupe-edit-profile)
popupOpenButton.addEventListener('click', () => {
  popupEditProfileForm.openPopup();
  inputEditProfileName.value = heading.textContent;
  inputEditProfileAbout.value = headingDescription.textContent;
  inputEditProfileName.dispatchEvent(new Event('input'));
  inputEditProfileAbout.dispatchEvent(new Event('input'));
});

// Слушатель на кнопку открытия второго попапа (для добавления карточки).
addBtn.addEventListener('click', () => {
  cardFormValidator.resetForm();
  popupAddCardForm.openPopup();
});

// Создаем карточки при загрузке страницы
const cardList = new Section(
  {
    items: initialCards,
    renderer: item => {
      const elementCard = createCard(item, '.element-template');

      cardList.addItem(elementCard);
    },
  },
  listContainerEl
);

cardList.renderItems();

// Создаем обьекты класса FormValidator для формы редактирования и формы добавления карточки
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
