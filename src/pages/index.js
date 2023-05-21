
import "../pages/index.css"
import Api from "../components/Api.js"
import FormValidator from "../components/FormValidator.js"
import Card from "../components/Card.js"
import Section from "../components/Section.js"
import UserInfo from "../components/UserInfo.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import DeleteCard from "../components/DeleteCard.js"
import {
  buttonOpenProfile, profileButtonGalery, profilePopup,
  popupGaleryElement, popupImgScale, configInfo, formProfile,
  formGalery, cardTemplate, cardsAllGalery, settingValidation,
  formAvatar, profileAvatarButton, popupAvatar, popupDeleteCard
} from "../utils/constansts.js"
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
//кнопка смены аватара
profileAvatarButton.addEventListener('click', () => {
  formAvatarValid.resetFormErrors()
  popupAddAvatar.open()
})
//api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'ab469772-0963-4d99-942b-83403a537f18',
    'Content-Type': 'application/json'
  }
})


const formProfileValid = new FormValidator(settingValidation, formProfile);
const formGaleryValid = new FormValidator(settingValidation, formGalery);
const formAvatarValid = new FormValidator(settingValidation, formAvatar);
const popupImage = new PopupWithImage(popupImgScale);

const popupProfile = new PopupWithForm(profilePopup, (data) => {
  userInfo.getUserInfo()
  api.editProfileInfo(data)
    .then(res => {
      userInfo.setUserInfo(res.data)
      popupProfile.close()
    })
    .catch((error) => console.error(`Ошибка ${error}`))
    .finally(() => popupProfile.setButtonText())
})
//форма для удаления карточки
const popupDeleteElem = new DeleteCard(popupDeleteCard, ({ card, cardId }) => {
  api.deleteMyCard(cardId)
    .then(() => {
      card.removeCard()
      popupDeleteElem.close()
    })
    .catch((error) => console.error(`Ошибка ${error}`))
})
//экземпляр аватарки
const popupAddAvatar = new PopupWithForm(popupAvatar, (data) => {
  api.editAvatar(data)
    .then(res => {
      userInfo.setUserInfo(res.data.avatar)
      popupAddAvatar.close()
    })
    .catch((error) => console.error(`Ошибка загрузки ${error}`))
    .finally(() => popupAddAvatar.setButtonText())
})
//экземпляр создания карточки
const popupCreateCard = new PopupWithForm(popupGaleryElement, (data) => {
  api.addCard(data)
    .then(res => {
      cardList.addItem(newCardList(res.data))
      popupAddAvatar.close()
    })
    .catch((error) => console.error(`Ошибка ${error}`))
    .finally(() => popupCreateCard.setButtonText())

})
const userInfo = new UserInfo(configInfo);

function newCardList(cardItem) {
  const card = new Card(cardItem, cardTemplate, popupImage.open, popupDeleteElem.open, () => {
    const isLiked = card.isLikedByMe()
    if (isLiked) {
      api.removeLike(card._userId)
        .then(res =>
          card.handleLikeClick(res)
        )
    } else {
      api.likeCard(card._userId)
        .then(res =>
          card.handleLikeClick(res)
        )
    }
  })
  return card.createCards()
}

const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(newCardList(data))
  }
}, cardsAllGalery)


popupImage.setEventListeners();
popupProfile.setEventListeners();
popupCreateCard.setEventListeners();
popupAddAvatar.setEventListeners();
popupDeleteElem.setEventListeners()

formProfileValid.enableValidation();
formGaleryValid.enableValidation();
formAvatarValid.enableValidation();

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([user, cards]) => {
    cards.forEach(elem => elem.myId = user._id)
    userInfo.setUserInfo(user)
    cardList.renderItems(cards)

  })






