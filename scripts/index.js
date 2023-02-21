const userNameElement = document.querySelector('.profile__title');
const userOccupationElement = document.querySelector('.profile__subtitle');
const userNameInput = document.querySelector('.popup__item_type_username');
const userOccupationInput = document.querySelector('.popup__item_type_useroccupation');
const popUp = document.querySelector('.popup');
let openPopUp = document.querySelector('#profile-edit-button');



function popupClose() {
  popUp.classList.remove('popup_opened');
}

openPopUp.addEventListener('click', function (event) {
  userNameInput.value = userNameElement.textContent;
  userOccupationInput.value = userOccupationElement.textContent;
  popUp.classList.add('popup_opened');
  console.log(popUp.className);
});


let closePopup = document.querySelector('.popup__close');
closePopup.addEventListener("click", function (event) {
  popupClose();
});


let formElement = document.querySelector('#form-edit');
formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userOccupationElement.textContent = userOccupationInput.value;
  popupClose();
});

















