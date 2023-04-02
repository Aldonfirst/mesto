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
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, rest);
      if (hasInvalidInput(inputList)) {
        enableButton(btnElement, inactiveButtonClass, rest)
      } else {
        disableButton(btnElement, inactiveButtonClass, rest)
      }
    });
  });
}
//поиск строки с ошибкой и ее вывод
function checkInputValidity(input, { errorClass, inputErrorClass }) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    errorElement.textContent = ''
    errorElement.classList.add(inputErrorClass)
    errorElement.classList.remove(errorClass)
  } else {
    errorElement.textContent = input.validationMessage
    errorElement.classList.remove(inputErrorClass)
    errorElement.classList.add(errorClass)
  }
};
function hasInvalidInput(inputs) {
  return inputs.some(item => !item.validity.valid);
};
//блок кнопок
function enableButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass)
  button.disabled = true;
}
function disableButton(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass)
  button.disabled = false;
};

enableValidation(settingValidation)
