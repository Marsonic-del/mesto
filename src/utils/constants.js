export const popupEditProfileSelector = ".popup-edit-profile";
export const popupAddCardSelector = ".popup-add-card";
export const popupImageSelector = ".popup_image";
export const popupRemoveSelector = ".popup_remove";
export const popupAvatarSelector = ".popup-avatar";
export const addBtn = document.querySelector(".profile__add-button");
export const openAvatarPopupBtn = document.querySelector(
  ".profile__avatar-button"
);
export const avatarImage = document.querySelector(".profile__avatar");
export const popup = document.querySelector(".popup");
export const popupEditProfile = document.querySelector(
  popupEditProfileSelector
);
export const popupAddCard = document.querySelector(popupAddCardSelector);
export const popupOpenButton = document.querySelector(".profile__edit-button");
export const popupAvatar = document.querySelector(popupAvatarSelector);
export const heading = document.querySelector(".profile__heading");
export const headingDescription = document.querySelector(
  ".profile__heading-description"
);
export const inputEditProfileName = popupEditProfile.querySelector(
  ".popup__input_type_name"
);
export const inputEditProfileAbout = popupEditProfile.querySelector(
  ".popup__input_type_about"
);
export const inputAddCardName = popupAddCard.querySelector(
  ".popup__input_type_name"
);
export const inputAddCardLink = popupAddCard.querySelector(
  ".popup__input_type_link"
);
export const listContainerEl = document.querySelector(".elements-list");
export const formEditProfile = popupEditProfile.querySelector(".popup__form");
export const formAddCard = popupAddCard.querySelector(".popup__form");
export const formAvatar = popupAvatar.querySelector(".popup__form");
export const closeButtonEditProfile = popupEditProfile.querySelector(
  ".popup__button-close"
);
export const closeButtonAddCard = popupAddCard.querySelector(
  ".popup__button-close"
);
export const imagePopup = document.querySelector(popupImageSelector);
export const closeButtonImage = imagePopup.querySelector(
  ".popup__button-close"
);
export const popupContainer = document.querySelectorAll(".popup");
export const popupCaption = imagePopup.querySelector(".popup__caption");
export const popupPicture = document.querySelector(".popup__picture");
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
export const userInfoConfig = {
  userNameSelector: ".profile__heading",
  userAboutSelector: ".profile__heading-description",
  userAvatarSelector: ".profile__avatar",
};

// Массив с карточками при загрузке страницы
/*export const initialCards = [
    {
      name: 'Львов',
      link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/%D0%9B%D0%B2%D0%BE%D0%B2_%D0%93%D0%B0%D0%BB%D0%B8%D1%86%D0%B8%D1%98%D0%B0.jpg/300px-%D0%9B%D0%B2%D0%BE%D0%B2_%D0%93%D0%B0%D0%BB%D0%B8%D1%86%D0%B8%D1%98%D0%B0.jpg'
    },
    {
      name: 'Ивано-Франковск',
      link: 'https://ic.pics.livejournal.com/dcfc_lad/11500645/120594/120594_original.jpg'
    },
    {
      name: 'Карпаты',
      link: 'http://wrs.com.ua/wp-content/uploads/2016/09/Karpaty-1.jpg'
    },
    {
      name: 'Черновцы',
      link: 'https://funtime.kiev.ua/uploads/img/gallery/big/2016/10/chernovcy-chernovcy-ukraina-chernovcy-dostoprimechatelnosti-chernovcy-universitet-chernovcy-otdyh-ch-57fb1e5b6f0b4.jpg'
    },
    {
      name: 'Одесса',
      link: 'https://uc.od.ua/content/documents/12192/1219138/thumb-item-452x340-89f3.jpg'
    },
    {
      name: 'Киев',
      link: 'https://news.liga.net/images/general/2020/09/25/thumbnail-tw-20200925111737-3540.jpg?v=1601025554'
    }
  ];*/
