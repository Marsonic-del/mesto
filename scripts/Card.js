const imagePopup = document.querySelector('.popup_image')
const closeButtonImage = imagePopup.querySelector('.popup__button-close');
const popupCaption = imagePopup.querySelector('.popup__caption');
const popupPicture = document.querySelector('.popup__picture');
const popupContainer = document.querySelectorAll('.popup');

class Card {
    constructor(data, cardSelector) {
      this._title = data.name;
      this._image = data.link;
      this._cardSelector = cardSelector;
    }
    _getTemplate() {
      // забираем размеку из HTML и клонируем элемент
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements-list__item')
      .cloneNode(true);
      // вернём DOM-элемент карточки
        return cardElement;
    }

    // Публичный метод. Добавляет карточки на страницу
    generateCard () {
      this._element = this._getTemplate();
      this._buttonLike = this._element.querySelector(".element__button-like");
      this._deleteButton = this._element.querySelector(".element__trash");
      this._element.querySelector('.element__picture').src = this._image;
      this._element.querySelector('.element__picture').alt = this._title;
      this._element.querySelector('.element__name').textContent = this._title;
      this._setEventListeners();
      return this._element;
    }

    // Заполняем данными попап с картинкой ('.popup_image')
    _handlePreviewPicture() {
      popupCaption.textContent = this._title;
      popupPicture.src = this._image;
      popupPicture.alt = this._title;
      openPopup(imagePopup)
    }

    // Управление кнопкой Like
    _handleLike() {
      this._buttonLike.classList.toggle('element__button-like_active');
    }
    //Метод удаления карточки
    _handleDeleteCard() {
      const _card = this._deleteButton.closest('.elements-list__item');
      _card.remove();
    }
    _setEventListeners() {
      //Обработчик превью картинки 
      this._element.querySelector('.element__picture').addEventListener('click', () => {
        this._handlePreviewPicture()
    })
      //Обработчик кнопки лайк
      this._buttonLike.addEventListener('click', () => {
        this._handleLike()
    })
      //Обработчик кнопки удаления картинки
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteCard()
    })
    }
  };

  //                                Функции
  
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

closePopupOverlay();

  export {Card, openPopup, closePopup};