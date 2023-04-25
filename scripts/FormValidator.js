export default class FormValidator {
  constructor(parameters, form) {
    const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass } = parameters
    this._form = form
    this._inputSelector = inputSelector
    this._submitButtonSelector = submitButtonSelector
    this._inactiveButtonClass = inactiveButtonClass
    this._inputErrorClass = inputErrorClass
    this._inputList = this._form.querySelectorAll(this._inputSelector)
    this._buttonElement = this._form.querySelector(this._submitButtonSelector)
   
  }
  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener(("input"), () => {
        this._input = input
        this._checkInputValidity();
        this._toggleButtonClass();
      })
    })
  }
  //поиск ошибки и проверка на валидность
  _checkInputValidity() {
    this._errorElement = this._form.querySelector(`.${this._input.id}-error`);
    if (this._input.validity.valid) {
      this._hideInputError()
    } else {
      this._showInputError()
    }
  }
  _showInputError() {
    this._input.classList.add(this._inputErrorClass);
    this._errorElement.textContent =  this._input.validationMessage;

  }
  _hideInputError() {
    this._input.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = "";
    this._errorElement 
    
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
    this._setEventListeners();
  
  }
  resetFormErrors(){
    this._inputList.forEach((input) =>{
      this._input = input
      this._errorElement = this._form.querySelector(`.${this._input.id}-error`);
      if(!input.validity.valid){
      this._hideInputError()
      }
    })
    this._toggleButtonClass()
    this._form.reset()
  }
}








