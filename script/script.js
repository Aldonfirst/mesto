 /* --------------Попап------------*/
const buttonOpenPopUp = document.querySelector('.button__popup-profile');
const profileform = document.querySelector('.popup');
const closeModal = profileform.querySelector('.popup__close');
/*--------------------Лайки----------*/
const likesElement = document.querySelectorAll('.element__like')
/*--------------------Для отправки формы------------*/
const formProfile = document.querySelector('.popup__form');
let nameInput =  formProfile.querySelector('[name="imput-username"]');
let jobInput = formProfile.querySelector('[name="imput-job"]');
let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');


/*------------------------open and close-------------*/
buttonOpenPopUp.addEventListener('click', () =>{
  profileform.classList.add('popup__opened');
});
closeModal.addEventListener ('click', () =>{
  profileform.classList.remove('popup__opened');
});


/*-----------------------------лайки-------------*/
for(let i = 0;i < likesElement.length; i++){
  likesElement[i].addEventListener('click',() =>{
  likesElement[i].classList.toggle('element__like_active');
  });
}


/*---------------------------Валидация-----------*/
function handleFormSubmit (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;

}
formProfile.addEventListener('submit', handleFormSubmit);
