import './pages/index.css';
import {
  initialCards, validationConfig,
  cardTemplateItem, cardsContainer, buttonEditProfile,
  buttonOpenFormNewCard
}
  from "./utils/constants.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { UserInfo } from "./components/UserInfo.js";
import { Section } from "./components/Section.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";




const userInfo = new UserInfo({
  name: ".profile__title",
  description: ".profile__subtitle",
});


const popupUserInfo = new PopupWithForm(".popup__change", {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);

  },
});
popupUserInfo.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  popupUserInfo.setInputValues(userInfo.getUserInfo());
  formValidators["profile__edit"].resetValidation();
  popupUserInfo.open();
});


const createCard = (data) => {
  const card = new Card(data, cardTemplateItem, () => {
    popupImage.open(data);
  });
  return card.generateCard();
};


const cardsList = new Section(
  {
    renderer: (initialCards) => {
      cardsList.setItem(createCard(initialCards));
    },
  },
  cardsContainer
);
cardsList.rendererItems(initialCards);


const popupAddNewCard = new PopupWithForm(".popup__add", {
  handleFormSubmit: ({ place, link }) => {
    cardsList.setItem(createCard({ name: place, link: link }));
  },
});
popupAddNewCard.setEventListeners();


const popupImage = new PopupWithImage(".popup-full-image");
popupImage.setEventListeners();

buttonOpenFormNewCard.addEventListener("click", () => {
  formValidators["profile__card"].resetValidation();
  popupAddNewCard.open();
});


const formValidators = {}

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.forms)
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement)
    const formName = formElement.getAttribute('name')///!
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);
formValidators['profile__edit'].resetValidation()
formValidators['profile__card'].resetValidation()