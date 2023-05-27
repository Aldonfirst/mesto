export {
  buttonOpenProfile, profileButtonGalery, profilePopup,
  popupGaleryElement, popupImgScale, configInfo, formProfile,
  formGalery, cardTemplate, cardsAllGalery, settingValidation,
  formAvatar, profileAvatarButton, popupAvatar,
  popupDeleteCard, formDeleteCard,
}
//кнопки  октрытия попапов
const buttonOpenProfile = document.querySelector('.profile__userbutton');
const profileButtonGalery = document.querySelector('.profile__saveimage');
const profileAvatarButton = document.querySelector('.profile__avatar-button');

//попапы
const popupDeleteCard = '.popup-type-delete'
const popupAvatar = '.popup-avatar'
const profilePopup = '.popup-profile'
const popupGaleryElement = '.popup-galery'
const popupImgScale = '.popup-image-scale'
//селектор для класса UserInfo
const configInfo = {
  nameSelector: '.profile__title',
  infoSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar',
}

//интилизация формы профиля
const formDeleteCard = document.forms["form-delete"]
const formProfile = document.forms["form-user"];
const formGalery = document.forms["form-galery"];
const formAvatar = document.forms["form-avatar"];

//контейнер карточки и контейнер для всех карточек
const cardTemplate = '#element__template'
const cardsAllGalery = '.element'
//валидация формы
const settingValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__imput-edit',
  submitButtonSelector: '.popup__button-validate',
  inactiveButtonClass: 'popup__button-validate_disabled',
  inputErrorClass: 'popup__imput-edit_vizible'
};


//const myToken = "ab469772-0963-4d99-942b-83403a537f18"
//Идентификатор группы: cohort-66"
