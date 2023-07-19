import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("div.popup__container .popup__container-input");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__item"));
    this._buttonSubmit = this._popup.querySelector(".popup__save");
    
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach((input) => {
      console.log(input)
      this._values[input.name] = input.value;
    });
    return this._values
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const initialText = this._buttonSubmit.textContent;
      this._buttonSubmit.textContent = "Сохранение ...";
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._buttonSubmit.textContent = initialText;
        });
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderPreloader(isLoading, displayText) {
    if (!this._buttonSubmit) return;
    if (isLoading) {
      this.defaulText = this._buttonSubmit.textContent;
      this._buttonSubmit.textContent = displayText;
    }
  }
}