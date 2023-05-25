
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
// экземпляры валидации
const formProfileValid = new FormValidator(settingValidation, formProfile);
const formGaleryValid = new FormValidator(settingValidation, formGalery);
const formAvatarValid = new FormValidator(settingValidation, formAvatar);
const popupImage = new PopupWithImage(popupImgScale);
const userInfo = new UserInfo(configInfo);
//шаблон сабмита
function handleSubmit(request, popupInstance, loadingText = "Сохранение...") {
  popupInstance.renderLoading(true, loadingText)
  request()
    .then(() => {
      popupInstance.close()
    })
    .catch((err) => {
      console.error(`Ошибка ${err}`);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}
//экземпляр профиля
const popupProfile = new PopupWithForm(profilePopup, (data) => {
  function makeRequest() {
    return api.editProfileInfo(data)
      .then((res) => {
        userInfo.setUserInfo({ username: res.name, job: res.about, avatar: res.avatar })
      })
  }
  handleSubmit(makeRequest, popupProfile)
})
//удаляшка
const popupDeleteElem = new DeleteCard(popupDeleteCard, (dataCard) => {
  return api.deleteMyCard(dataCard.cardId)
    .then(() => {
      dataCard.card.removeCard()
      popupDeleteElem.close()
    }).catch(err => console.log(err))

})
//экземпляр аватарки
const popupAddAvatar = new PopupWithForm(popupAvatar, (data) => {
  function makeRequest() {
    return api.editAvatar(data)
      .then((res) => {
        userInfo.setUserInfo({ username: res.name, job: res.about, avatar: res.avatar })
      });
  }
  handleSubmit(makeRequest, popupAddAvatar,);
})
//экземпляр создания карточки
const popupCreateCard = new PopupWithForm(popupGaleryElement, (data) => {
  function makeRequest() {
    return Promise.all([api.getUserData(), api.addCard(data)])
      .then(([userData, cardData]) => {
        cardData.myId = userData._id
        cardList.addItemPrepend(newCardList(cardData))
      })
  }
  handleSubmit(makeRequest, popupCreateCard,)
})
//экземпляр  самой карточки
function newCardList(cardItem) {
  const card = new Card(cardItem, cardTemplate, popupImage.open, popupDeleteElem.open,
    () => {
      const isLiked = card.isLikedByMe();
      if (isLiked) {
        api.removeLike(cardItem._id)
          .then(res => {
            card.updateLikesCount(res.likes);
            card.toggleLikeButton();
          })
          .catch(err => console.log(err));
      } else {
        api.likeCard(cardItem._id)
          .then(res => {
            card.updateLikesCount(res.likes);
            card.toggleLikeButton();
          })
          .catch(err => console.log(err));
      }
    });
  return card.createCards()
}
//экземпляр секции
const cardList = new Section({
  renderer: (data) => {
    cardList.addItemPrepend(newCardList(data))
  }
}, cardsAllGalery)

//вызовы сабмита форм
const popups = [popupImage, popupProfile, popupCreateCard, popupAddAvatar, popupDeleteElem];
popups.forEach((popup) => popup.setEventListeners())
//вызовы валидации форм
const formsValid = [formProfileValid, formGaleryValid, formAvatarValid];
formsValid.forEach((forms) => forms.enableValidation())

//запрос для карточек и информации пользователя
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    cards.forEach(elem => elem.myId = userData._id)
    userInfo.setUserInfo({ username: userData.name, job: userData.about, avatar: userData.avatar })
    cardList.renderItems(cards.reverse())// тут сделал реверс чтобы не писать метод в классе Section
  }).catch(err => console.log(err));




