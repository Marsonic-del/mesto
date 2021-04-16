import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import Api from './components/Api.js';
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
  avatarSelector: '.profile__avatar',
});
const imagePopupHandler = new PopupWithImage({ popupSelector: '.popup_image' });
const popupEditProfileForm = new PopupWithForm({
  popupSelector: '.popup-edit-profile',
  handleFormSubmit: formValues => {
    //Редактируем информацию о пользователе если сервер удовлетворит запрос с методом PATCH
    api
      .editProfile(formValues)
      .then(result => {
        userInfo.setUserInfo(result);
        popupEditProfileForm.closePopup();
      })
      .catch(err => console.log(err));
  },
});
//Используем этот обьект класса Section для  доступа к его методу addItemPrepend()
const cardAdding = new Section({}, listContainerEl);

//Используем этот обьект для добавления карточек на страницу через попап '.popup-add-card'
const popupAddCardForm = new PopupWithForm({
  popupSelector: '.popup-add-card',
  handleFormSubmit: formValues => {
    api
      .addCard(formValues)
      .then(card => {
        console.log(card.likes.length);
        const newCard = createCard(card, '.element-template');
        cardAdding.addItemPrepend(newCard);
      })
      .catch(response => console.log(`Ошибка ${response.status}`));
  },
});

//Обьект класса Api для получения данных от сервера
const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-22',
  token: '06d63aad-75bc-4641-be17-ed6babb8063a',
});

// Создаем карточки при загрузке страницы методом getInitialCards()
api
  .getInitialCards()
  .then(cards => {
    const cardList = new Section(
      {
        items: cards,
        renderer: card => {
          const elementCard = createCard(card, '.element-template');
          cardList.addItem(elementCard);
        },
      },
      listContainerEl
    );
    cardList.renderItems();
  })
  .catch(response => {
    console.log(`Ошибка ${response.status}`);
  });

//Методом getUserInfo() класса Api получаем данные пользователя от сервера
api
  .getUserInfo()
  // Теперь полученные данные вставляем на страницу методом setUserInfo() класса UserInfo при загрузке
  .then(message => {
    userInfo.setUserInfo(message);
  })
  .catch(err => {
    console.log('Ошибка');
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
/*const cardList = new Section(
  {
    items: initialCards,
    renderer: item => {
      const elementCard = createCard(item, '.element-template');

      cardList.addItem(elementCard);
    },
  },
  listContainerEl
);

cardList.renderItems();*/

// Создаем обьекты класса FormValidator для формы редактирования и формы добавления карточки
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
