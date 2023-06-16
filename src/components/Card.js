export class Card {

  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return this._templateSelector.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".element__image");
    this._buttonLike = this._element.querySelector(".element__likes");
    this._buttonDelete = this._element.querySelector(".element__delete");

    this._popupCardPhoto = document.querySelector('.popup-full-image');
    this._popupImageCard = document.querySelector('.popup__pic');
    this._popupTitleCard = document.querySelector('.popup__pic-directory');

    this._setEventListeners();

    this._image.setAttribute("src", `${this._link}`);
    this._image.setAttribute("alt", `${this._name}`);
    this._element.querySelector(".element__title").textContent = `${this._name}`;
    return this._element;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => this._toggleLike());
    this._buttonDelete.addEventListener("click", () => this._deleteCard());
    this._image.addEventListener("click", () => this._handleCardClick(this._name, this._link));
  }

  _toggleLike() {
    this._buttonLike.classList.toggle("element__likes_active");
  }

  _deleteCard() {
    this._element.remove();
  }
}