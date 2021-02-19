let addBtn = document.querySelector('.profile__add-button')


let popupContainer = document.querySelector('.popup-container');
let popup = document.querySelector('.popup');
let popup_E1 = document.querySelector('.popup_E1');
let popup_E2 = document.querySelector('.popup_E2');
const imagePopup = document.querySelector('.popup_image')
const popupPicture = document.querySelector('.popup__picture');


let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = popup.querySelector('.popup__btn-close');

let heading = document.querySelector('.profile__heading');
let headingDescription = document.querySelector('.profile__heading-description');

let formElement = popup_E1.querySelector('.popup__form');
let formElementE2 = popup_E2.querySelector('.popup__form');





function openPopup(popupName) {
    popupName.classList.add('popup_opened');
}


popupContainer.addEventListener('click', (evt) => {
  closePopup(evt.target);
})


function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}



function formSubmitHandler(evt) {
    evt.preventDefault();
    const inputName = popup_E1.querySelector('.popup__text_type_name');
    const inputAbout = popup_E1.querySelector('.popup__text_type_about');
    heading.textContent = inputName.value;
    headingDescription.textContent = inputAbout.value;
    closePopup(popup_E1);
}


formElement.addEventListener('submit', formSubmitHandler);

popupOpenButton.addEventListener('click', () => {
    openPopup(popup_E1);
    const inputName = popup_E1.querySelector('.popup__text_type_name');
    const inputAbout = popup_E1.querySelector('.popup__text_type_about');
    inputName.value = heading.textContent;
    inputAbout.value = headingDescription.textContent;
  } );

  popup_E1.querySelector('.popup__btn-close').addEventListener('click', () => {
    closePopup(popup_E1);
  });

  popup_E2.querySelector('.popup__btn-close').addEventListener('click', () => {
    closePopup(popup_E2);
  });

  imagePopup.querySelector('.popup__btn-close').addEventListener('click', () => {
    closePopup(imagePopup);
  });



                                        //Проектная работа №5

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

    

const listContainerEl = document.querySelector('.elements-list');


// Функция загрузки карточек из массива
function render(arr) {

  const html = arr.map(getItem)
  listContainerEl.append(...html);
};


function getItem(item) {

  const elementTemplate = document.querySelector('.element-template').content;
  const cloneElement = elementTemplate.querySelector('.elements-list__item').cloneNode(true);
  cloneElement.querySelector('.element__picture').src = item.link;
  cloneElement.querySelector('.element__picture').alt = item.name;
  cloneElement.querySelector('.element__name').textContent = item.name;

  return cloneElement;
}

render(initialCards);


// Слушатель на кнопку "лайк" карточки

listContainerEl.addEventListener('click', (evt) => {
  const btnLike = document.querySelector('.element__button-like');
  if(evt.target.classList.contains('element__button-like')) {
    handleLike(evt);
  }
})
 
// Функция реагирования на нажатие кнопки "лайк" 
function handleLike(evt) {
  evt.target.classList.toggle('element__button-like_active');
}



//Удаление карточек

listContainerEl.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('element__trash')) {
    const delBtn = evt.target;
    const elementListItem = delBtn.closest('.elements-list__item');
    elementListItem.remove();
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


// Функция добавления карточки из второго попапа
function formSubmitHandlerPopup_E2(evt) {
  evt.preventDefault();
  const elementsList = document.querySelector('.elements-list');
  const elementTemplate = document.querySelector('.element-template').content;
  const cloneElement = elementTemplate.querySelector('.elements-list__item').cloneNode(true);
  const inputName = popup_E2.querySelector('.popup__text_type_name');
  const inputLink = popup_E2.querySelector('.popup__text_type_link');
  cloneElement.querySelector('.element__picture').src = inputLink.value;
  cloneElement.querySelector('.element__picture').alt = inputName.value;
  cloneElement.querySelector('.element__name').textContent = inputName.value;
  elementsList.prepend(cloneElement);
  closePopup(popup_E2);
}



// Слушатель на кнопку открытия второго попапа (для добавления карточки).
addBtn.addEventListener('click', () => {
    openPopup(popup_E2);
  } );


  // Добавляем карточку на страницу
  formElementE2.addEventListener('submit', formSubmitHandlerPopup_E2);

  

  
  