//поиск массива форм
function enableValidation({ formSelector, ...rest }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(form => {
    setEvtListeners(form, rest);
  });
}
//поиск массива импутов и кнопки
function setEvtListeners(form, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const btnElement = form.querySelector(submitButtonSelector);
  toggleButtonClass(inputList, btnElement, inactiveButtonClass);
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, rest);
      toggleButtonClass(inputList, btnElement, inactiveButtonClass);
    });
  });
}
//поиск строки с ошибкой и ее вывод
function checkInputValidity(input, { errorClass, inputErrorClass }) {
  const errorElement = document.querySelector(`.${input.id}-error`);
  if (input.validity.valid) {
    hideInputError(input, errorElement, errorClass, inputErrorClass)
  } else {
    showInputError(input, errorElement, errorClass, inputErrorClass)
  }
};
function showInputError(input, errorElement, inputErrorClass) {
  input.classList.add(inputErrorClass);
  errorElement.textContent = input.validationMessage;
}
function hideInputError(input, errorElement, inputErrorClass) {
  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
}
function toggleButtonClass(inputList, btnElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    disableButton(btnElement, inactiveButtonClass)
  } else {
    enableButton(btnElement, inactiveButtonClass)
  }
}
function hasInvalidInput(inputList) {
  return inputList.some(item => !item.validity.valid);
};
//блок кнопок
function enableButton(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass)
  button.disabled = false;
}
function disableButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass)
  button.disabled = true;
};

