import FormValidator from "./FormValidator.js"
import Card from "./Card.js"

const formProfileValid = new FormValidator(settingValidation, formProfile);
const formGaleryValid = new FormValidator(settingValidation, formGalery);
formProfileValid.enableValidation();
formGaleryValid.enableValidation();

//попап профиля
buttonOpenProfile.addEventListener('click', () => {
  openPopup(profilePopup);
  profileTitle.value = nameInput.textContent;
  profileSubTitle.value = jobInput.textContent;
});
//попап карточек
profileButtonGalery.addEventListener('click', () => {
  formGaleryValid.resetButtonBeforeSubmit()
  openPopup(popupGaleryElement);
});
//--------------------анонимки для открытия и закрытия
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', popupCloseByEscape);
};
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popupCloseByEscape);
}
//закрытие модалок
closeButtons.forEach(item => {
  const closeForms = item.closest('.popup');
  item.addEventListener('click', () => closePopup(closeForms));
  //закрытие модалок по оверлею
  closeForms.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(evt.currentTarget);
    }
  });
});
//закрытие по ESC
function popupCloseByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
  }
};
//---------------сабмит попапа профиля----------------------------------------
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;
  closePopup(profilePopup);
  formProfile.reset();//ресет инф профиля
}
formProfile.addEventListener('submit', handleProfileFormSubmit);
// ---------------------сабмит галереи---------------------------------------------
function handleGaleryFormSubmit(evt) {
  evt.preventDefault();
  const newElement = ({ name: nameInputGalery.value, link: linkInputGalery.value });
  CardListAdd(cardsAllGalery, newCardCreate(newElement))
  formGalery.reset();//ресет инф в карточке
  closePopup(popupGaleryElement);

}
formGalery.addEventListener('submit', handleGaleryFormSubmit);

function CardListAdd(container, card) {
  container.prepend(card)
}

//функция просмора картинки в карточке
function scaleImageInCard(item) {
  popupFigureImage.src = item.link;
  popupFigureImage.alt = item.name;
  popupFigcaptionImage.textContent = item.name;
  openPopup(popupImgScale);
}


initialCards.forEach((elem) => {
  CardListAdd(cardsAllGalery, newCardCreate(elem));
});
//функция создания карточки 
function newCardCreate(elem) {
  const card = new Card(elem, cardTemplate, scaleImageInCard);
  const cardElement = card.createCards()
  return cardElement;
}

