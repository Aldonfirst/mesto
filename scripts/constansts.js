//интилизация профиля
const profilePopup = document.querySelector('.popup-profile');//форма профиля
const buttonOpenProfile = document.querySelector('.profile__userbutton');//кнопка открытия профиля
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
//интилизация закрытия попапа
const closeButtons = document.querySelectorAll('.popup__close');//закрытие всех модалок
//интилизация карточек
const popupGaleryElement = document.querySelector('.popup-galery');//форма карточек
const profileButtonGalery = document.querySelector('.profile__saveimage');//открытие формы доб.карточки
//интилизация шаблона темплейт
const cardTemplate = document.querySelector('#element__template').content;
const cardsAllGalery = document.querySelector('.element');
//интилизация попапа с картинкой
const popupImgScale = document.querySelector('.popup-image-scale');
const popupFigureImage = popupImgScale.querySelector('.popup-figure__image');
const popupFigcaptionImage = popupImgScale.querySelector('.popup-figure__figcaption');
//массив
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//интилизация формы профиля
const formProfile = document.forms["form-user"];
const nameInput = formProfile.querySelector('.popup__imput-edit_user_name');
const jobInput = formProfile.querySelector('.popup__imput-edit_user_job');
//интилизация формы галереи
const formGalery = document.forms["form-galery"];
const nameInputGalery = formGalery.querySelector('.popup__imput-edit_el_name');
const linkInputGalery = formGalery.querySelector('.popup__imput-edit_el_link');
//валидация формы
const settingValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__imput-edit',
  submitButtonSelector: '.popup__button-validate',
  inactiveButtonClass: 'popup__button-validate_disabled',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__error_active'
};
