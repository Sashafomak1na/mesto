import './pages/index.css';
import {
  
  profileName, profileSign, initialCards,  config,
  cardTemplateItem, popupCardPhoto, cardsContainer, popupEditProfile, buttonEditProfile,
  popupFormNewCard, buttonOpenFormNewCard
}
  from "./utils/constants.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { UserInfo } from "./components/UserInfo.js";
import { Section } from "./components/Section.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";

const editProfileFormValidator = new FormValidator(config, document.forms.profile);
const addCardFormValidator = new FormValidator(config, document.forms.element);




//профиль
const userInfo = new UserInfo({
  username: ".profile__title",
  useroccupation: ".profile__subtitle",
});

//попап профиля
const popupUserInfo = new PopupWithForm(popupEditProfile, {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);

  },
});
popupUserInfo.setEventListeners();

// редактирование профиля
buttonEditProfile.addEventListener("click", () => {
  popupUserInfo.setInputValues(userInfo.getUserInfo());
  // editProfileFormValidator.refreshForm();
  popupUserInfo.open();
  
});


//создание карточки
const createCard = (data) => {
  const card = new Card(data, cardTemplateItem, () => {
    popupImage.open(data);
  });
  return card.generateCard();
};

//наполнение карточками
const cardsList = new Section(
  {
    renderer: (initialCards) => {
      cardsList.setItem(createCard(initialCards));
    },
  },
  cardsContainer
);
cardsList.rendererItems(initialCards);

//попап добавления новой карточки
const popupAddNewCard = new PopupWithForm(popupFormNewCard, {
  handleFormSubmit: ({ place, link }) => {
    cardsList.setItem(createCard({ name: place, link: link }));
  },
});
popupAddNewCard.setEventListeners();

/**
 * Полноразмерное фото карточки
 **/

//попап полноразмерного фото карточки
const popupImage = new PopupWithImage(popupCardPhoto);
popupImage.setEventListeners();

buttonOpenFormNewCard.addEventListener("click", () => {
  addCardFormValidator.refreshForm();
  popupAddNewCard.open();
});


editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();



 




