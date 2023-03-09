const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Архыз",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Архыз",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Архыз",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Архыз",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Архыз",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Архыз",
  },
];

const inputPlaceUrl = document.querySelector(".popup__item_type_picture");
const inputPlaceName = document.querySelector(".popup__item_type_called");
const userNameElement = document.querySelector(".profile__title");
const userOccupationElement = document.querySelector(".profile__subtitle");
const userNameInput = document.querySelector(".popup__item_type_username");
const userOccupationInput = document.querySelector(
  ".popup__item_type_useroccupation"
);
const popupChangeProfile = document.querySelector("#change-profile");
const popUpOpenChangeProfile = document.querySelector(".profile__edit");
const popupFullPic = document.querySelector("#popup-full-image");
const popupFullPicImage = popupFullPic.querySelector(".popup__pic");
const popupFullPicDescription = document.querySelector(".popup__pic-directory");
const popupFormTypeLink = document.querySelector(".popup__item_type_picture");
const popupFormTypeName = document.querySelector(".popup__item_type_callpopup");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popUp) {
  popUp.classList.remove("popup_opened");
}

popUpOpenChangeProfile.addEventListener("click", function (event) {
  userNameInput.value = userNameElement.textContent;
  userOccupationInput.value = userOccupationElement.textContent;
  openPopup(popupChangeProfile);
});

const profileCloseButton = document.querySelector(".popup__close");
profileCloseButton.addEventListener("click", function () {
  closePopup(popupChangeProfile);
});

const profileForm = document.querySelector("#form-edit");

profileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userOccupationElement.textContent = userOccupationInput.value;
  closePopup(popupChangeProfile);
});

const elements = document.querySelector(".elements");
const elementTemplate = document.querySelector("#cardTemplate").content;

function createCard(card) {
  const cardTemplate = elementTemplate.cloneNode(true);
  const cardHeading = cardTemplate.querySelector(".element__title");
  cardHeading.textContent = card.name;
  const cardImage = cardTemplate.querySelector(".element__image");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.alt);
  const deleteButton = cardTemplate.querySelector(".element__delete");
  deleteButton.addEventListener("click", handleDeleteButtonClick);

  const likeActive = cardTemplate.querySelector(".element__likes");
  likeActive.addEventListener("click", function (event) {
    likeActive.classList.toggle("element__likes_active");
  });

  cardImage.addEventListener("click", function (event) {
    openPopup(popupFullPic);
    popupFullPicImage.setAttribute("src", card.link);
    popupFullPicImage.setAttribute("alt", card.name);

    popupFullPicDescription.textContent = cardHeading.textContent;
  });
  return cardTemplate;
}

const addCard = (card) => {
  elements.prepend(createCard(card));
};

initialCards.forEach(addCard);

function handleDeleteButtonClick(event) {
  const button = event.target;
  const card = button.closest(".element");
  card.remove();
}

const cardForm = document.querySelector("#form-picture");
const popupAddCard = document.querySelector("#add-card");
const cardPopupOpenButton = document.querySelector(".profile__add");
const addCardClose = popupAddCard.querySelector(".popup__close");
cardPopupOpenButton.addEventListener("click", function (event) {
  openPopup(popupAddCard);
});

addCardClose.addEventListener("click", function () {
  closePopup(popupAddCard);
});

function handleCardFormSubmit(event) {
  const cardData = new Object();
  event.preventDefault();
  cardData.link = popupFormTypeLink.value;
  cardData.name = popupFormTypeName.value;
  addCard(cardData);
  closePopup(popupAddCard);
  cardForm.reset();
}

cardForm.addEventListener("submit", handleCardFormSubmit);

const popupCloseFullPic = popupFullPic.querySelector(".popup__close");

popupCloseFullPic.addEventListener("click", function () {
  closePopup(popupFullPic);
});
