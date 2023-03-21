//попап профиля
 const profileform = document.querySelector('.popup-profile');//форма профиля
 const buttonOpenProfile = document.querySelector('.profile__userbutton');//кнопка открытия профиля
 const profileTitle = document.querySelector('.profile__title');
 const profileSubTitle = document.querySelector('.profile__subtitle');
 //закрытие всех модалок
 const closeAllModals = document.querySelectorAll('.popup__close');

  buttonOpenProfile.addEventListener('click',()=>{
    openPopup(profileform);
    profileTitle.value = nameInput.textContent;
  profileSubTitle.value = jobInput.textContent;
  });
/*-----------------------------------------------------------------------*/
//попап карточек
const popupGaleryElement = document.querySelector('.popup-galery');//форма карточек
const profileButtonGalery = document.querySelector('.profile__saveimage');//открытие формы доб.карточки

profileButtonGalery.addEventListener('click' ,()=>{
  openPopup(popupGaleryElement);
 });
//--------------------анонимки для открытия и закрытия
const openPopup =(popup) =>{
  popup.classList.add('popup_opened');
};
const closePopup = (popup) =>{
  popup.classList.remove('popup_opened')
}
//закрытие модалок
closeAllModals.forEach(item =>{
  const closeForms = item.closest ('.popup');
item.addEventListener('click',()=> closePopup(closeForms));
});
//-----------------сабмит попапа профиля
const formProfile = document.querySelector('.popup__form-user');
const nameInput =  formProfile.querySelector('.popup__imput-edit_user_name');
const jobInput = formProfile.querySelector('.popup__imput-edit_user_job');

function handleFormSubmit (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;
  closePopup(profileform);
}
formProfile.addEventListener('submit', handleFormSubmit);
// ---------------------сабмит галереи
const formGalery = document.querySelector('.popup__form-galery');
const nameInputGalery = formGalery.querySelector('.popup__imput-edit_el_name');
const linkInputGalery = formGalery.querySelector('.popup__imput-edit_el_link');

function handleGalerySubmit (event) {
  event.preventDefault();
  const newElement = ({name:nameInputGalery.value,link:linkInputGalery.value});
  cloneElement = createCards(newElement);
  cardsAllGalery.prepend(cloneElement);
  formGalery.reset();//ресет инф в импутах
  closePopup(popupGaleryElement);
}
formGalery.addEventListener('submit', handleGalerySubmit);
//-----------------------------массив с фото
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
const cardTemplate = document.querySelector('#element__template').content;
const cardsAllGalery = document.querySelector('.element');
const popupImgScale = document.querySelector('.popup-image-scale');
const popupFigureImage = popupImgScale.querySelector('.popup-figure__image');
const popupFigcaptionImage = popupImgScale.querySelector('.popup-figure__figcaption');
//----------------------------темплейт
function createCards (item) {
  const cloneElement = cardTemplate.cloneNode(true);
  const imageElement = cloneElement.querySelector('.element__photo');
    imageElement.src = item.link;
    imageElement.alt = item.name;
//зум картинки
    imageElement.addEventListener('click',()=>{
    popupFigureImage.src = item.link;
    popupFigureImage.alt = item.name;
    popupFigcaptionImage.textContent = item.name;
    openPopup(popupImgScale);
  });
  //лайки
  const likes = cloneElement.querySelector('.element__like');
  likes.addEventListener('click', (evt)=>{
    evt.target.classList.toggle('element__like_active');
  });
//мусорка
const trash = cloneElement.querySelector('.element__garbage');
trash.addEventListener('click',(evt)=>{
  evt.target.closest('.element__item').remove();
});
//название карточки
cloneElement.querySelector('.element__caption').textContent = item.name;

 return cloneElement;
}
//перебор массива initialCards
initialCards.forEach(elem =>{
  cloneElement = createCards(elem);
  cardsAllGalery.append(cloneElement);
});

