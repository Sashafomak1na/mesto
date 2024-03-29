export class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._buttonClose = this._popup.querySelector(".popup__close");
        this._handleCloseByEsc = this._handleCloseByEsc.bind(this);
    }

    open() {
        this._popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleCloseByEsc);
    }

    close() {
        this._popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleCloseByEsc);
    }

    _handleCloseByEsc = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };

    setEventListeners() {
        this._popup.addEventListener("click", (evt) => {
            if (
                evt.target.classList.contains("popup__close") ||
                evt.target.classList.contains("popup_opened")
            ) {
                this.close();
            }
        });
    }
}