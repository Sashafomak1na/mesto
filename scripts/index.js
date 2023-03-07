const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Архыз',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Архыз',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Архыз',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Архыз',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Архыз',
  }
]; 

const inputPlaceUrl = document.querySelector('.popup__item_type_picture');
const inputPlaceName = document.querySelector('.popup__item_type_called');
const userNameElement = document.querySelector('.profile__title');
const userOccupationElement = document.querySelector('.profile__subtitle');
const userNameInput = document.querySelector('.popup__item_type_username');
const userOccupationInput = document.querySelector('.popup__item_type_useroccupation');
const popupChangeProfile = document.querySelector('#change-profile');
let openPopUpChangeProfile = document.querySelector('.profile__edit');
const popupFullPic = document.querySelector('#popup-full-image');
const popupFullPicImage = popupFullPic.querySelector(".popup__pic");
const popupFullPicDescription = document.querySelector(".popup__pic-directory");
const popupFormTypeLink = document.querySelector('.popup__item_type_picture');
const popupFormTypeName = document.querySelector('.popup__item_type_callpopup');


function popupClose(popUp) {
  popUp.classList.remove('popup_opened');
}

openPopUpChangeProfile.addEventListener("click", function (event) {
  userNameInput.value = userNameElement.textContent;
  userOccupationInput.value = userOccupationElement.textContent;
  popupChangeProfile.classList.add('popup_opened');
});




let closePopup = document.querySelector('.popup__close');
closePopup.addEventListener('click', function() {
  popupClose(popupChangeProfile);
});




let formElement = document.querySelector('#form-edit');

formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userOccupationElement.textContent = userOccupationInput.value;
  popupClose(popupChangeProfile);
});


//formElement.addEventListener('submit', myFuncSecond);



//Карточки 

const elements = document.querySelector(".elements");
const elementTemplate = document.querySelector('#cardTemplate').content;

function createCard(card) {
  const cardTemplate = elementTemplate.cloneNode(true);
  const cardHeading = cardTemplate.querySelector(".element__title");
  cardHeading.textContent = card.name;
  const cardImage = cardTemplate.querySelector(".element__image");
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.alt);
  const deleteButton = cardTemplate.querySelector(".element__delete");
  deleteButton.addEventListener("click", handleDeleteButtonClick);


  const likeActive = cardTemplate.querySelector(".element__likes");
  likeActive.addEventListener("click", function (event) {
    likeActive.classList.toggle("element__likes_active");
    console.log(likeActive)
  });

  cardImage.addEventListener("click", function (event) {
    popupFullPic.classList.add('popup_opened');
    popupFullPicImage.setAttribute("src", card.link);
    popupFullPicImage.setAttribute("name", card.name);
    popupFullPicImage.setAttribute("alt", card.name);
  
    popupFullPicDescription.textContent = cardHeading.textContent;
  });
  return cardTemplate;
}



const addCard = card => {
  // объявляем функцию добавления карточки в DOM
  elements.prepend(createCard(card)); // вставляем в DOM карточку из функции createCard
};


initialCards.forEach(addCard);


function handleDeleteButtonClick(event) {
  const button = event.target;
  const card = button.closest(".element");
  card.remove();
}


//Добавление карточек 

const popupAddCard = document.querySelector("#add-card");
const buttonOpen = document.querySelector(".profile__add");
const addCardClose = popupAddCard.querySelector(".popup__close");
buttonOpen.addEventListener("click", function (event) {
  popupAddCard.classList.add("popup_opened");
});


addCardClose.addEventListener("click", function () {
  popupClose(popupAddCard);
});



function handleFormSubmit(event) {
  const cardss = new Object();
  event.preventDefault()
  cardss.link = popupFormTypeLink.value
  cardss.name =  popupFormTypeName.value
 addCard(cardss); // передаём созданную карточку cardss в функцию addCard (чтобы добавить её в DOM)
 popupClose(popupAddCard);
}

const formpig = document.querySelector('#form-picture'); // ищем форму по ID, чтобы не создавать лишний файл стилей для формы
formpig.addEventListener('submit', handleFormSubmit);
console.log(formpig);

 // Лайк





// Модульная картинка закрытие




const closePopupFullPic = popupFullPic.querySelector(".popup__close");

closePopupFullPic.addEventListener('click', function() {
  popupClose(popupFullPic);
});






