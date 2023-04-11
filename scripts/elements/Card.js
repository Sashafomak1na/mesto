export default class Card {
    constructor(data, addingCardHandle,templateOfCard,templateSelector){
        this._image = data.link;
        this._name = data.name;
        this._cardImage = templateOfCard.itemImage;
        this._cardTitle = templateOfCard.itemName;
        this._cardLike = templateOfCard.likeCardBtn;
        this._cardDelete = templateOfCard.delBtn;
        this._addingCardHandle = addingCardHandle;
        this._templateSelector = templateSelector;
    }

    _getTemplate(){
        const cardElement = this._templateSelector.content.querySelector('.element').cloneNode(true);
        return cardElement
        
      
    }

    _likeCardHandler(){
        this._card.querySelector(this._cardLike).classList.toggle('element__likes_active');

    }

    _deleteCardHandler() {
        this._card.remove();
    }

    _setEventListeners() {
        this._card.querySelector(this._cardImage).addEventListener('click', () => this._addingCardHandle(this._name, this._image));
        this._card.querySelector(this._cardLike).addEventListener('click', () => this._likeCardHandler());
        this._card.querySelector(this._cardDelete).addEventListener('click', () => this._deleteCardHandler());
    }

    generateCard () {
        this._card = this._getTemplate();
        this._setEventListeners();
        this._card.querySelector(this._cardImage).src = this._image;
        this._card.querySelector(this._cardImage).alt = this._name;
        this._card.querySelector(this._cardTitle).textContent = this._name;
        return this._card;
    }
}