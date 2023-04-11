const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Архыз'
  }
];

import {validate, addCardConst, templateOfCard,popupPhotoConst, popupEditConst} from './elements/constants.js';
import Card from './elements/Card.js';
import FormValidator from './elements/FormValidator.js';


const templateSelector = document.getElementById('cardTemplate');

const switchPopupListeners = () => {
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach(popup => {
      popup.addEventListener('click', evt => {
          if(evt.target.classList.contains('popup_opened')) {
              closePopup(popup);
          }
          if (evt.target.classList.contains('popup__close')) {
              closePopup(popup);
          }
      })
  })
}

const escClose = 'Escape';
const closeEscapeButton = (evt) => {
  if(evt.key === escClose) {
      const popup = document.querySelector('.popup_opened');
      closePopup(popup);
  }

}

//function openPopup(popUp) {
  //popUp.classList.add('popup_opened');
  //includeEscListener();
//}

const openPopup = popupElement => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscapeButton);
  console.log('А')
};

const closePopup = popupElement => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscapeButton);
};


const editFormValidation = new FormValidator (validate, popupEditConst.popupProfileForm);
editFormValidation.enableValidation();
const cardFormValidation = new FormValidator (validate, addCardConst.popupAddCardForm);
cardFormValidation.enableValidation();


const  submitButtonHandler = (evt) => {
    evt.preventDefault();
    popupEditConst.profileTitleName.textContent = popupEditConst.popupProfileInputName.value;
    popupEditConst.profileJob.textContent = popupEditConst.popupProfileInputJob.value;
    closePopup(popupEditConst.popupEditProfile); 
}

const editFunctionHandler = () => {
    popupEditConst.popupProfileInputName.value = popupEditConst.profileTitleName.textContent;
    popupEditConst.popupProfileInputJob.value = popupEditConst.profileJob.textContent;
    editFormValidation.resetValidation();
    openPopup(popupEditConst.popupEditProfile); 

}

const addingCardHandler = (name, link) => {
    popupPhotoConst.popupImage.src = link;
    popupPhotoConst.popupImage.alt = name;
    popupPhotoConst.popupText.textContent = name;
    openPopup(popupPhotoConst.popupSectionPhoto);

}


const addSubmitCard = (evt) => {
    evt.preventDefault();
    addCardHandler({
        name: addCardConst.popupPlaceTitle.value,
        link: addCardConst. popupUrlphoto.value
    });
    closePopup(addCardConst.popupAddCard);

}



const makeCard = item => {
    const card = new Card(item, addingCardHandler, templateOfCard, templateSelector);
    const cardElement = card.generateCard();
    return cardElement;
}
const addCardHandler = (item, ending) => {
    const cardElement = makeCard(item);
    const conditional = ending ? 'append' : 'prepend';
    addCardConst.cardsList[conditional] (cardElement);

}

const renderList = () => {
    initialCards.forEach(item => {
        addCardHandler(item, true);
    })
}
renderList();



switchPopupListeners();

popupEditConst.profileEditButton.addEventListener('click', editFunctionHandler);
console.log(popupEditConst.profileEditButton)
popupEditConst.popupProfileForm.addEventListener('submit', submitButtonHandler)

addCardConst.profileAddButton.addEventListener('click', () => {
    addCardConst. popupAddCardForm.reset();
    cardFormValidation.resetValidation();
    openPopup(addCardConst.popupAddCard)
});
addCardConst.popupAddCardForm.addEventListener('submit', addSubmitCard);












