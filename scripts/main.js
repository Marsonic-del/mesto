const addBtn = document.querySelector('.profile__add-button')


const popupContainer = document.querySelector('.popup-container');
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const imagePopup = document.querySelector('.popup_image')
const popupPicture = document.querySelector('.popup__picture');


const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__btn-close');

const heading = document.querySelector('.profile__heading');
const headingDescription = document.querySelector('.profile__heading-description');

const listContainerEl = document.querySelector('.elements-list');

const formEditProfile = popupEditProfile.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');

const templateEl = document.querySelector('.element-template');




  //                                         *** ФУНКЦИИ ***


// Функция открытия попапа
function openPopup(popupName) {
    popupName.classList.add('popup_opened');
}

// Функция закрытия попапа
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}


// Функция заполнения профиля через popupEditProfile
function formSubmitHandler(evt) {
  evt.preventDefault();
  const inputName = popupEditProfile.querySelector('.popup__text_type_name');
  const inputAbout = popupEditProfile.querySelector('.popup__text_type_about');
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
  elementPicture.src = item.link;
  elementPicture.alt = item.name;
  elementName.textContent = item.name;

  return cloneElement;
}


// Функция реагирования на нажатие кнопки "лайк" 
function handleLike(evt) {
  evt.target.classList.toggle('element__button-like_active');
}


// Функция добавления карточки из второго попапа
function formSubmitHandlerPopup_E2(evt) {
  evt.preventDefault();
  
  const inputName = popupAddCard.querySelector('.popup__text_type_name');
  const inputLink = popupAddCard.querySelector('.popup__text_type_link');
  const cardObject = {name: inputName.value, link: inputLink.value}
  const returnCardObj = getItem(cardObject);
  listContainerEl.prepend(returnCardObj);
  closePopup(popupAddCard);
  inputName.value = '';
  inputLink.value = '';
}


//Функция удаления карточки
function handleDeleteCard(evt) {
  
    const delBtn = evt.target;
    const elementListItem = delBtn.closest('.elements-list__item');
    elementListItem.remove();
  
}



              //                          Слушатели и обработчики событий

// Закрытие попапов ("оверлей")
popupContainer.addEventListener('click', (evt) => {
  closePopup(evt.target);
})



// Открываем попап редактирования (popupe-edit-profile)
popupOpenButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  const inputName = popupEditProfile.querySelector('.popup__text_type_name');
  const inputAbout = popupEditProfile.querySelector('.popup__text_type_about');
  inputName.value = heading.textContent;
  inputAbout.value = headingDescription.textContent;
} );

// Сохраняем введенную информацию в попапе редактирования (popupe-edit-profile)
formEditProfile.addEventListener('submit', formSubmitHandler);


// Закрываем попап редактирования (popupe-edit-profile) кнопкой закрытия
  popupEditProfile.querySelector('.popup__btn-close').addEventListener('click', () => {
    closePopup(popupEditProfile);
  });


  // Закрываем попап добавления карточки (popupe-add-card) кнопкой закрытия
  popupAddCard.querySelector('.popup__btn-close').addEventListener('click', () => {
    closePopup(popupAddCard);
  });


  // Закрываем popup_image кнопкой закрытия
  imagePopup.querySelector('.popup__btn-close').addEventListener('click', () => {
    closePopup(imagePopup);
  });


  // добавим всему списку карточек обработчик лайка отдельной карточки 

listContainerEl.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('element__button-like')) {
    handleLike(evt);
  }
})



// добавим всему списку карточек обработчик удаления отдельной карточки 
listContainerEl.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('element__trash')) {
    handleDeleteCard(evt);
  }
})


// Слушатель для открытия третьего попапа (popup_image)

listContainerEl.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('element__picture')) {    
    popupPicture.src = evt.target.src;
    const popupCaption = document.querySelector('.popup__caption');
    const element = evt.target.closest('.element');
    const elementName = element.querySelector('.element__name')
    popupCaption.textContent = elementName.textContent;
    openPopup(imagePopup)
  } 
})


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



 
















  

  
  