import './pages/index.css';
import { apiConfig } from './utils/constants.js';
import { Api } from "./components/Api.js";
import { Card } from "./components/Card.js";
import { UserInfo } from "./components/UserInfo.js";
import { Section } from "./components/Section.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupSubmit } from "./components/PopupSubmit.js";
import {
  cardsContainer,
  popupEditProfile,
  validationConfig,
  cardTemplateItem,
  buttonEditProfile,
  popupFormNewCard,
  buttonOpenFormNewCard,
  buttonAvatar,
  popupDelete,
  popupAvatar, 
  popupCardPhoto
} from "./utils/constants.js";



/**
 * Профиль
 **/

let currentUserId;
const api = new Api(apiConfig.url, apiConfig.headers);
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([user, data]) => {
    currentUserId = user._id;
    userInfo.setUserInfo({ username: user.name, useroccupation: user.about });
    userInfo.setUserAvatar(user);
    cardsList.rendererItems(data, currentUserId);
  })
  .catch((error) => console.log(error));




//профиль
const userInfo = new UserInfo({
  username: ".profile__title",
  useroccupation: ".profile__subtitle",
  avatar: ".profile__avatar"
});
console.log(userInfo)
//попап профиля
const popupUserInfo = new PopupWithForm(popupEditProfile, {
  handleFormSubmit: (data) => {
    return api
    .setUserInfoApi(data)
    .then(() => userInfo.setUserInfo(data))
    .then(() => {
      popupUserInfo.close()})
    .catch((error) => console.log(error));
  },
});


// редактирование профиля
buttonEditProfile.addEventListener("click", () => {
  popupUserInfo.setInputValues(userInfo.getUserInfo());
  formValidators["form-profile"].resetValidation();
  popupUserInfo.open();
});


//создание карточки
const createCard = (data, user) => {
  const card = new Card({
    data: data,
    userId: user,
    templateSelector: cardTemplateItem,
    handleCardClick: () => {
      popupImage.open(data);
    },

    handleDeleteCard: (cardID, cardElement) => {
      popupFormDelete.open(cardID, cardElement);
    },

    like: (cardID) => {
      api
        .sendLike(cardID)
        .then((res) => card.renderLikes(res))
        .catch((error) => console.log(error));
    },
    unlike: (cardID) => {
      api
        .deleteLike(cardID)
        .then((res) => card.renderLikes(res))
        .catch((error) => console.log(error));
    },
  });

  return card.generateCard();
};

//наполнение карточками
const cardsList = new Section(
  {
    renderer: (initialCards, userId) => {
      cardsList.addItem(createCard(initialCards, userId));
    },
  },
  ".elements"
);


//попап добавления новой карточки
const popupAddNewCard = new PopupWithForm(popupFormNewCard, {
  handleFormSubmit: ({ place, link }) => {
    return api
      .addNewCards({ name: place, link: link })
      .then((newCard) => {
        cardsList.addItemPrepend(createCard(newCard, currentUserId));
      })
      .then(() => {
        popupAddNewCard.close()})
      .catch((error) => console.log("add card :", error));
  },
});



//удаление карточки 
const popupFormDelete = new PopupSubmit(popupDelete, {
  handleSubmit: (id, card) => {
    popupFormDelete.renderPreloader(true, "Удаление ...");
    api
      .deleteCardApi(id)
      .then(() => {
        card.deleteCard();
      }).then(() => {popupFormDelete.close();})
      .catch((error) => console.log("error delete card :" + error))
      .finally(() => {
        popupFormDelete.renderPreloader(false);
      });
  },
});

/**
 * Полноразмерное фото карточки
 **/

//попап полноразмерного фото карточки
const popupImage = new PopupWithImage(popupCardPhoto);
popupImage.setEventListeners();

buttonOpenFormNewCard.addEventListener("click", () => {
  formValidators["form-card"].resetValidation();
  popupAddNewCard.open();
});



//попап редактировапния аватара
const newAvatar = new PopupWithForm(popupAvatar, {
  handleFormSubmit: (data) => {
    return api
      .setUserAvatar(data)
      .then((data) => {
        userInfo.setUserAvatar(data);
      })
      .then(() => {
        newAvatar.close()})
      .catch((error) => console.log(error));
  },
});

buttonAvatar.addEventListener("click", () => {
  formValidators["form-avatar"].resetValidation();
  newAvatar.open();
});


//цепляем листнеры
popupImage.setEventListeners();
popupUserInfo.setEventListeners();
popupAddNewCard.setEventListeners();
popupFormDelete.setEventListeners();
newAvatar.setEventListeners();

const formValidators = {}

// включение валидации
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationConfig, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);


 




