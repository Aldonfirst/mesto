export default class Card{
    constructor(cardItem,cardTemplate,scaleImgInCard){
      this._cardItem = cardItem;
    this._cardTemplate = cardTemplate;
   this._scaleImgInCard = scaleImgInCard;
   this._link = cardItem.link;
   this._name = cardItem.name;
    }
    _getCloneTemplate() {
  return this._cardTemplate.content.querySelector('.element__item').cloneNode(true)
    }
  _handleLikeClick = () => {
    this._like.classList.toggle('element__like_active');
  }
  _handleDeleteCardElem=()=>{
    this._cloneElem.remove();
  }
  _handleScaleImage =()=> {
    this._scaleImgInCard(this._cardItem);
  }
  _setEventListener() {
    this._like.addEventListener('click',this._handleLikeClick);
    this._trash.addEventListener('click',this._handleDeleteCardElem);
    this._imageElem.addEventListener('click',this._handleScaleImage);
  }
  createCards = () =>{
    this._cloneElem = this._getCloneTemplate();
    this._imageElem = this._cloneElem.querySelector('.element__photo');
    this._imageElem.src = this._link;
    this._imageElem.alt = this._name;
    this._titleImage = this._cloneElem.querySelector('.element__caption')
    this._titleImage.textContent = this._name;
    this._like = this._cloneElem.querySelector('.element__like');
    this._trash = this._cloneElem.querySelector('.element__garbage');
    this._setEventListener();
  
    return this._cloneElem;
  }
  }