import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__pic");
    this._popupImageCaption = this._popup.querySelector(".popup__pic-directory");
  }

  open = (item) => {
    this._popupImage.alt = item.name;
    this._popupImage.src = item.link;
    this._popupImageCaption.textContent = item.name;

    super.open();
  };
}
