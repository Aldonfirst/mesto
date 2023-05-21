import Popup from "./Popup.js";

export default class DeleteCard extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector)
    this._submitFunction = submitFunction
  }
  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction(this._elem)
    })
  }
  open = (elem) => {
    super.open()
    this._elem = elem
  }
}