
import {handlePreviewPicture} from './index.js'

export default class Card {
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
      this._pictureElement = this._element.querySelector('.element__picture')
      this._buttonLike = this._element.querySelector(".element__button-like");
      this._deleteButton = this._element.querySelector(".element__trash");
      this._pictureElement.src = this._image;
      this._pictureElement.alt = this._title;
      this._element.querySelector('.element__name').textContent = this._title;
      this._setEventListeners();
      return this._element;
    }

    // Управление кнопкой Like
    _handleLike() {
      this._buttonLike.classList.toggle('element__button-like_active');
    }
    //Метод удаления карточки
    _handleDeleteCard() {
      const card = this._deleteButton.closest('.elements-list__item');
      card.remove();
    }
    _setEventListeners() {
      //Обработчик превью картинки 
      this._pictureElement.addEventListener('click', () => {
        handlePreviewPicture(this._title, this._image)
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
 
  