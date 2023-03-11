const buttonOpenPopUp = document.querySelector('.profile__userbutton');
const profileform = document.querySelector('.popup');
const closeModal = profileform.querySelector('.popup__close');
 /* --------------Попап------------*/
function showPopUp(){
  profileform.classList.add('popup_opened');
  profileTitle.value = nameInput.textContent;
  profileSubTitle.value = jobInput.textContent ;
};

buttonOpenPopUp.addEventListener('click' , showPopUp);

function closePopUp(){
  profileform.classList.remove('popup_opened');
};
closeModal.addEventListener ('click' , closePopUp);

/*--------------------Для отправки формы------------*/
const formProfile = document.querySelector('.popup__form');
const nameInput =  formProfile.querySelector('.popup__imputForProfile_user_name');
const jobInput = formProfile.querySelector('.popup__imputForProfile_user_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');

function handleFormSubmit (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;

  closePopUp();
}
formProfile.addEventListener('submit', handleFormSubmit);



















/*-----------------------------лайки-------------
const likesElement = document.querySelectorAll('.element__like');

for(let i = 0;i < likesElement.length; i++){
  likesElement[i].addEventListener('click',() =>{
  likesElement[i].classList.toggle('element__like_active');
  });
}
*/
