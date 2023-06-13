import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._popupImg = this._popupSelector.querySelector('.popup__pic');
        this._popupSignature = this._popupSelector.querySelector('.popup__pic-directory');



    }
    open = (item) => {
        this._popupImg.src = item.link
        this._popupImg.alt = item.name
        this._popupSignature.textContent = item.name
        super.open();
    }
}
