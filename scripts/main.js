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

const inputName = popupEditProfile.querySelector('.popup__input_type_name');
const inputAbout = popupEditProfile.querySelector('.popup__input_type_about');

const listContainerEl = document.querySelector('.elements-list');

const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');

const templateEl = document.querySelector('.element-template');


  //                                         *** ФУНКЦИИ ***

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
    hideInputError(form, inputElement)
    })
  }
};

// Функция закрытия попапа
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  resetPopupForm(popupName);
}

// Функция закрытия попапов клавишей Esc 
const closePopupByEscape = function (evt) {
  console.log(evt.key === "Escape")
  if(evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

// Функция заполнения профиля через popupEditProfile
function formSubmitHandler(evt) {
  evt.preventDefault();
  const inputName = popupEditProfile.querySelector('.popup__input_type_name');
  const inputAbout = popupEditProfile.querySelector('.popup__input_type_about');
  heading.textContent = inputName.value;
  headingDescription.textContent = inputAbout.value;
  closePopup(popupEditProfile);
}


// Функция загрузки карточек из массива
function render(arr) {

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
  
  openPopup(imagePopup)
}


// Функция реагирования на нажатие кнопки "лайк" 
function handleLike(likeButton) {
  likeButton.classList.toggle('element__button-like_active');
}


// Функция добавления карточки из второго попапа
function formSubmitHandlerPopup_E2(evt) {
  evt.preventDefault();
  
  const inputName = popupAddCard.querySelector('.popup__input_type_name');
  const inputLink = popupAddCard.querySelector('.popup__input_type_link');
  const inputList = Array.from(formAddCard.querySelectorAll('.popup__input'));
  const buttonElement = formAddCard.querySelector('.popup__button');
  const cardObject = {name: inputName.value, link: inputLink.value}
  const returnCardObj = getItem(cardObject);
  listContainerEl.prepend(returnCardObj);
  closePopup(popupAddCard);
  formAddCard.reset();
  toggleButtonState(inputList, buttonElement);
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
  inputName.value = heading.textContent;
  inputAbout.value = headingDescription.textContent;

  inputName.dispatchEvent(new Event('input'));
  inputAbout.dispatchEvent(new Event('input'));
} );

// Сохраняем введенную информацию в попапе редактирования (popupe-edit-profile)
formEditProfile.addEventListener('submit', formSubmitHandler);


// Закрываем попап редактирования (popupe-edit-profile) кнопкой закрытия
  popupEditProfile.querySelector('.popup__button-close').addEventListener('click', () => {
    closePopup(popupEditProfile);
  });


  // Закрываем попап добавления карточки (popupe-add-card) кнопкой закрытия
  popupAddCard.querySelector('.popup__button-close').addEventListener('click', () => {
    closePopup(popupAddCard);
  });


  // Закрываем popup_image кнопкой закрытия
  imagePopup.querySelector('.popup__button-close').addEventListener('click', () => {
    closePopup(imagePopup);
  });


/*// добавим всему списку карточек обработчик удаления отдельной карточки 
listContainerEl.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('element__trash')) {
    handleDeleteCard(evt);
  }
})*/


// Слушатель на кнопку открытия второго попапа (для добавления карточки).
addBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
} );


// Добавляем карточку на страницу
formAddCard.addEventListener('submit', formSubmitHandlerPopup_E2);



                                        
// Массив с карточками при загрузке страницы
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

// Загружаем карточки с массива
render(initialCards);

closePopupOverlay();





 
















  

  
  