
import "../pages/index.css"
import FormValidator from "../components/FormValidator.js"
import Card from "../components/Card.js"
import Section from "../components/Section.js"
import UserInfo from "../components/UserInfo.js"

import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import {
  buttonOpenProfile, profileButtonGalery, profilePopup,
  popupGaleryElement, popupImgScale, configInfo, formProfile,
  formGalery, cardTemplate, cardsAllGalery, settingValidation, initialCards
} from "../utils/constansts.js"

//валидация формы профиля
const formProfileValid = new FormValidator(settingValidation, formProfile);
//валидация формы доб.карочек
const formGaleryValid = new FormValidator(settingValidation, formGalery);
//экземпляры попапов
const popupImage = new PopupWithImage(popupImgScale);
const popupProfile = new PopupWithForm(profilePopup, (data) => {
  userInfo.setUserInfo(data)
})
const popupCreateCard = new PopupWithForm(popupGaleryElement, (data) => cardList.addItem(data))
const userInfo = new UserInfo(configInfo);
// экземпляр секции и доб.рендерер
const cardList = new Section({
  items: initialCards,
  renderer: function (cardItem) {
    const card = new Card(cardItem, cardTemplate, popupImage.open)
    return card.createCards()
  }
}, cardsAllGalery)

//кнопка профиля
buttonOpenProfile.addEventListener('click', () => {
  popupProfile.setInputValues(userInfo.getUserInfo())
  formProfileValid.resetFormErrors()
  popupProfile.open()
});
//кнопка галереи
profileButtonGalery.addEventListener('click', () => {
  formGaleryValid.resetFormErrors()
  popupCreateCard.open()

});
//добавление карточек с массива на страницу
cardList.renderItems()

popupImage.setEventListeners()
popupProfile.setEventListeners()
popupCreateCard.setEventListeners()

formProfileValid.enableValidation();
formGaleryValid.enableValidation();

