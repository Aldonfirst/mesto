export default class FormValidation {
  constructor(params, form) {
    const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass } = params
    this._form = form
    this._inputSelector = inputSelector
    this._submitButtonSelector = submitButtonSelector
    this._inactiveButtonClass = inactiveButtonClass
    this._inputErrorClass = inputErrorClass
    this._inputList = form.querySelectorAll(this._inputSelector)
    this._buttonElement = form.querySelector(this._submitButtonSelector)
  }
  _setEvtListeners() {
    this._toggleButtonClass();
    this._buttonElement.disabled = true;
    this._inputList.forEach((input) => {
      input.addEventListener(("input"), () => {
        this._checkInputValidity(input)
        this._toggleButtonClass();
      })
    })
  }
  //поиск ошибки и проверка на валидность
  _checkInputValidity(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    if (input.validity.valid) {
      this._hideInputError(input, errorElement)
    } else {
      this._showInputError(input, errorElement)
    }
  }
  _showInputError(input, errorElement) {
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;

  }
  _hideInputError(input, errorElement) {
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }
  _hasInvalidInput() {
    return Array.from(this._inputList).every(item => item.validity.valid);
  }
  //тогл кнопок и проверка на валидность
  _toggleButtonClass() {
    if (this._hasInvalidInput()) {
      this._enableButton();
    } else {
      this._disableButton(this._buttonElement);
    }
  }
  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  enableValidation() {
    this._setEvtListeners();
  }

}








