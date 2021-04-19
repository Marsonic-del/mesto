import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Api from "./components/Api.js";
import PopupRemove from "./components/PopupRemove.js";
import {
  validationConfig,
  formAddCard,
  formEditProfile,
  formAvatar,
  listContainerEl,
  popupOpenButton,
  addBtn,
  inputEditProfileName,
  inputEditProfileAbout,
  heading,
  headingDescription,
  avatar,
  avatarImage,
} from "./utils/constants.js";
import waitingForLoad from "./utils/utils.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import "./pages/index.css";

const cardFormValidator = new FormValidator(validationConfig, formAddCard);
const profileFormValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
const avatarFormValidator = new FormValidator(validationConfig, formAvatar);
const userInfo = new UserInfo({
  userNameSelector: ".profile__heading",
  userInfoSelector: ".profile__heading-description",
  avatarSelector: ".profile__avatar",
});
const imagePopupHandler = new PopupWithImage({ popupSelector: ".popup_image" });
const popupEditProfileForm = new PopupWithForm({
  popupSelector: ".popup-edit-profile",
  handleFormSubmit: (formValues) => {
    waitingForLoad(popupEditProfileForm, "Сохранение...");
    //Редактируем информацию о пользователе если сервер удовлетворит запрос с методом PATCH
    api
      .editProfile(formValues)
      .then((result) => {
        userInfo.setUserInfo(result);
        popupEditProfileForm.close();
      })
      .catch((err) => console.log(err))
      .finally(waitingForLoad(popupEditProfileForm, "Сохранить"));
  },
});
const popupAvatarForm = new PopupWithForm({
  popupSelector: ".popup-avatar",
  handleFormSubmit: (formValues) => {
    waitingForLoad(popupAvatarForm, "Сохранение...");
    api
      .editAvatar(formValues.link)
      .then((res) => (avatarImage.src = res.avatar))
      .catch((err) => console.log(err))
      .finally(waitingForLoad(popupAvatarForm, "Сохранить"));
  },
});
//Используем этот обьект класса Section для  доступа к его методу prependItem()
const cardAdding = new Section({}, listContainerEl);

//Используем этот обьект для добавления карточек на страницу через попап '.popup-add-card'
const popupAddCardForm = new PopupWithForm({
  popupSelector: ".popup-add-card",
  handleFormSubmit: (formValues) => {
    waitingForLoad(popupAddCardForm, "Создание...");
    api
      .addCard(formValues)
      .then((card) => {
        const newCard = createCard(card, userId, ".element-template");
        cardAdding.prependItem(newCard);
      })
      .catch((response) => console.log(`Ошибка ${response.status}`))
      .finally(waitingForLoad(popupAddCardForm, "Создать"));
  },
});

//Используем этот обьект для удаления карточек  через попап '.popup_remove'
const popupRemoveCard = new PopupRemove({
  popupSelector: ".popup_remove",
  //Аргументы: id карточки и сама карточка для удаления
  handleFormSubmit: (idCard, cardRemove) => {
    waitingForLoad(popupRemoveCard, "Удаление...");
    api
      .removeCard(idCard)
      .then(
        cardRemove.remove(),
        popupRemoveCard.close(),
        waitingForLoad(popupRemoveCard, "Да")
      )
      .catch((response) => console.log(`Ошибка ${response.status}`))
      .finally(waitingForLoad(popupRemoveCard, "Да"), popupRemoveCard.close());
  },
});

//Обьект класса Api для получения данных от сервера
const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-22",
  token: "06d63aad-75bc-4641-be17-ed6babb8063a",
});

let userId;
//Методом getUserInfo() класса Api получаем данные пользователя от сервера
// Создаем карточки при загрузке страницы методом getInitialCards()
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    // Теперь полученные данные вставляем на страницу методом setUserInfo() класса UserInfo при загрузке
    userInfo.setUserInfo(userData);
    const cardList = new Section(
      {
        items: cards,
        renderer: (card) => {
          const elementCard = createCard(card, userId, ".element-template");
          cardList.appendItem(elementCard);
        },
      },
      listContainerEl
    );
    cardList.renderItems();
  })
  .catch((err) => console.log(err));

popupAddCardForm.setEventListeners();
popupEditProfileForm.setEventListeners();
imagePopupHandler.setEventListeners();
popupRemoveCard.setEventListeners();
popupAvatarForm.setEventListeners();

//                                          ФУНКЦИИ
// Функция создания карточки
function createCard(cardElement, idUser, cardSelector) {
  const card = new Card(
    {
      handleCardClick: () => {
        imagePopupHandler.open(cardElement);
      },
      //Аргументы: id карточки и сама карточка для удаления
      handleTrashClick: (idCard, cardRemove) =>
        popupRemoveCard.open(idCard, cardRemove),

      handleLikeClick: (idCard) => {
        if (!card.liked) {
          //Добавляем лайк
          api
            .addLike(idCard)
            .then((res) => {
              card.handleLike();
              card.likesNumber.textContent = res.likes.length;
              card.liked = true;
            })
            .catch((err) => console.log(err));
        } else {
          //Удаляем лайк
          api
            .deleteLike(idCard)
            .then((res) => {
              card.handleLike();
              card.likesNumber.textContent = res.likes.length;
              card.liked = false;
            })
            .catch((err) => console.log(err));
        }
      },
    },
    idUser,
    cardElement,
    cardSelector
  );
  return card.generateCard();
}

//                          Слушатели событий

// Открываем попап редактирования (popupe-edit-profile)
popupOpenButton.addEventListener("click", () => {
  popupEditProfileForm.open();
  inputEditProfileName.value = heading.textContent;
  inputEditProfileAbout.value = headingDescription.textContent;
  inputEditProfileName.dispatchEvent(new Event("input"));
  inputEditProfileAbout.dispatchEvent(new Event("input"));
});

// Слушатель на кнопку открытия второго попапа (для добавления карточки).
addBtn.addEventListener("click", () => {
  cardFormValidator.resetForm();
  popupAddCardForm.open();
});

avatar.addEventListener("click", () => {
  avatarFormValidator.resetForm();
  popupAvatarForm.open();
});

// Создаем обьекты класса FormValidator для формы редактирования и формы добавления карточки
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
