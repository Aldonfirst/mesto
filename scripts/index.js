
 /* ---------------------------Попап профиля------------*/
 const profileform = document.querySelector('.popup__profile');//form pr
 const closeModalUser = document.querySelector('.popup__close_el-user');//close pr
 const buttonOpenProfile = document.querySelector('.profile__userbutton');//open pr

function showPopUp(){
  profileform.classList.add('popup_opened');
  profileTitle.value = nameInput.textContent;
  profileSubTitle.value = jobInput.textContent;
};
buttonOpenProfile.addEventListener('click' , showPopUp);

function closePopUp(){
  profileform.classList.remove('popup_opened');
};
closeModalUser.addEventListener ('click' , closePopUp);

/*--------------------------Попап с картинками------------*/
const popupGaleryElement = document.querySelector('.popup__galery');//form gal
const closeFormGalery = document.querySelector('.popup__close_el-galery');//close gal
const profileButtonGalery = document.querySelector('.profile__saveimage');//open gal +

function showPopUpGalery(){
  popupGaleryElement.classList.add('popup_open-galery');
};
profileButtonGalery.addEventListener('click' , showPopUpGalery);

function closePopUpGalery(){
  popupGaleryElement.classList.remove('popup_open-galery');
};
closeFormGalery.addEventListener('click' , closePopUpGalery);

function closePopUpGalery(){
  popupGaleryElement.classList.remove('popup_open-galery');
};
closeFormGalery.addEventListener('click' , closePopUpGalery);
//-----------------сабмит попапа профиля
const formProfile = document.querySelector('.popup__form-user');
const nameInput =  formProfile.querySelector('.popup__imputprofile_user_name');
const jobInput = formProfile.querySelector('.popup__imputprofile_user_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');

function handleFormSubmit (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;
  closePopUp();
}
formProfile.addEventListener('submit', handleFormSubmit);
// ---------------------сабмит галереи
const formGalery = document.querySelector('.popup__form-galery');
const nameInputGalery = formGalery.querySelector('.popup__imputgalery_el_name');
const linkInputGalery = formGalery.querySelector('.popup__imputgalery_el_link');

function handleSubmitAdd (event) {
  event.preventDefault();
  const newElement = ({name:nameInputGalery.value,link:linkInputGalery.value});
  cloneElement = createCards(newElement);
  cardsAllGalery.prepend(cloneElement);
  formGalery.reset();//ресет инф в импутах
  closePopUpGalery();
}
formGalery.addEventListener('submit', handleSubmitAdd);

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


const popupImgScale = document.querySelector('.popup__image-scale');

//----------------------------темплейт
function createCards (item) {
  const cloneElement = cardTemplate.cloneNode(true);
  const imageElement = cloneElement.querySelector('.element__photo');
  imageElement.src = item.link;
  imageElement.alt = item.name;

  imageElement.addEventListener('click',(evt)=>{
    popupFigureImage.src = item.link;
    popupFigureImage.alt = item.name;
    popupFigcaptionImage.textContent = item.name;
  imgShow(popupImgScale);
  });
imageElement;
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
const popupFigureImage = popupImgScale.querySelector('.popup__figure-image');
const popupFigcaptionImage = popupImgScale.querySelector('.popup__figcaption-image');

const imgShow =(evt)=>{
  popupImgScale.classList.toggle('popup_open-img');

}
