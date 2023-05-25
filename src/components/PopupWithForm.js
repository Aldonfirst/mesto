import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._inputs = Array.from(this._form.querySelectorAll('.popup__imput-edit'));
    this._submitBtn = document.querySelector('.popup__button-validate');
    this._submitBtnText = this._submitBtn.textContent;
  }
  _getInputValues() {
    const values = {};
    this._inputs.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setInputValues(data) {
    this._inputs.forEach(input => {
      input.value = data[input.name]
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
  }

  renderLoading(isLoading, loadingText = "Сохранение...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
