const userNameElement = document.querySelector('.profile__title');
const userOccupationElement = document.querySelector('.profile__subtitle');
const userNameInput = document.querySelector('.pop-up__item-first');
const userOccupationInput = document.querySelector('.pop-up__item-second');
const popUp = document.querySelector('.pop-up');


const openPopUp = document.querySelector('.profile__link');
let closePopup = document.querySelector(".pop-up__close");


openPopUp.addEventListener('click', function(e){
    e.preventDefault();
    popUp.classList.add('pop-up_state_active');
    console.log(popUp.className);
});


function popupClose() {
  popUp.classList.remove("pop-up_state_active");
}


closePopup.addEventListener("click", function (event) {
  popupClose();
});

let formElement = document.querySelector(".pop-up__container");
formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  userNameElement.textContent = userNameInput.value;
  userOccupationElement.textContent = userOccupationInput.value;
  popupClose();
});



