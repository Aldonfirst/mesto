import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popup.querySelector('.popup-figure__image');
      this._popupCaption = this._popup.querySelector('.popup-figure__figcaption');

    }

    open =(cardData)=> {
      const {link,name} = cardData
      super.open();
      this._popupImage.src = link;
      this._popupImage.alt = name;
      this._popupCaption.textContent = name;
    }
  }
