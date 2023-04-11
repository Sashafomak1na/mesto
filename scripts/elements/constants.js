
const templateOfCard = {
  likeCardBtn: ('.element__likes'),
  delBtn: ('.element__delete'),
  itemName: ('.element__title'),
  itemImage: ('.element__image')
}




const validate = ({
  formSelector: '.popup__container-input',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_valid',
  inputErrorClass: 'popup__item_type_invalid',
  errorClass: 'popup__item-error_type_picture'
});

const addCardConst = {
  profileAddButton: document.querySelector('.profile__add'),
  popupAddCard: document.querySelector('#add-card'),
  cardsList: document.querySelector('.elements'),
  popupPlaceTitle: document.querySelector('.popup__item_type_callpopup'),
  popupUrlphoto: document.querySelector('.popup__item_type_picture'),
  popupAddCardForm: document.querySelector('#form-picture')
};


const popupPhotoConst = {
  popupSectionPhoto: document.querySelector('#popup-full-image'),
  popupImage: document.querySelector('.popup__pic'),
  popupText: document.querySelector('.popup__pic-directory'),

  }


const popupEditConst = {
  profileEditButton: document.querySelector('.profile__edit'),
  popupProfileInputName: document.querySelector('.popup__item_type_username'),
  popupProfileInputJob: document.querySelector('.popup__item_type_useroccupation'),
  profileJob: document.querySelector('.profile__subtitle'),
  profileTitleName: document.querySelector('.profile__title'),
  popupEditProfile: document.querySelector('#change-profile'),
  popupProfileForm: document.querySelector('#form-edit'),
}

export {validate, addCardConst, templateOfCard,popupPhotoConst, popupEditConst};


