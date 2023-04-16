//попап профиля
buttonOpenProfile.addEventListener('click', () => {
  openPopup(profilePopup);
  profileTitle.value = nameInput.textContent;
  profileSubTitle.value = jobInput.textContent;

});
/*-----------------------------------------------------------------------*/
//попап карточек
profileButtonGalery.addEventListener('click', () => {
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
//-----------------сабмит попапа профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;
  closePopup(profilePopup);
  formProfile.reset();//ресет инф профиля
}
formProfile.addEventListener('submit', handleProfileFormSubmit);
// ---------------------сабмит галереи
function handleGaleryFormSubmit(evt) {
  evt.preventDefault();
  const newElement = ({ name: nameInputGalery.value, link: linkInputGalery.value });
  const cloneElement = createCards(newElement);
  cardsAllGalery.prepend(cloneElement);
  formGalery.reset();//ресет инф в карточке
  closePopup(popupGaleryElement);
  //деактивация кнопки после добавления карточки
  disableButton(evt.submitter, settingValidation.inactiveButtonClass)
}
formGalery.addEventListener('submit', handleGaleryFormSubmit);

//----------------------------темплейт
function createCards(item) {
  const cloneElement = cardTemplate.cloneNode(true);
  const imageElement = cloneElement.querySelector('.element__photo');
  imageElement.src = item.link;
  imageElement.alt = item.name;
  //зум картинки
  imageElement.addEventListener('click', () => {
    popupFigureImage.src = item.link;
    popupFigureImage.alt = item.name;
    popupFigcaptionImage.textContent = item.name;
    openPopup(popupImgScale);
  });
  //лайки
  const like = cloneElement.querySelector('.element__like');
  like.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active');
  });
  //мусорка
  const trash = cloneElement.querySelector('.element__garbage');
  trash.addEventListener('click', (evt) => {
    evt.target.closest('.element__item').remove();
  });
  //название карточки
  cloneElement.querySelector('.element__caption').textContent = item.name;

  return cloneElement;
}
//перебор массива initialCards
initialCards.forEach(elem => {
  const cloneElem = createCards(elem);
  cardsAllGalery.append(cloneElem);
});

enableValidation(settingValidation);



