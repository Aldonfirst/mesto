
export default class Card {
  constructor(cardItem, cardTemplate, scaleImageInCard, deleteClick, callbackLike) {
    const { name, link, _id, owner, likes, myId } = cardItem;
    this._cardItem = cardItem
    this._cardTemplate = cardTemplate;
    this._scaleImageInCard = scaleImageInCard;
    this._deleteClick = deleteClick;
    this._callbackLike = callbackLike;
    this._name = name;
    this._link = link;
    this._userId = _id
    this._ownerId = owner;
    this._likes = likes;
    this._myId = myId;
  }
  _getCloneTemplate() {
    return document.querySelector(this._cardTemplate).content.querySelector('.element__item').cloneNode(true)
  }
  _handleDeleteCard = () => {
    this._deleteClick({ cardId: this._userId, card: this })
  }
  removeCard() {
    this._cloneElem.remove();
  }
  _handleScaleImage = () => {
    this._scaleImageInCard(this._cardItem)
  }

  _setEventListener() {
    this._like.addEventListener('click', this._callbackLike);
    this._trash.addEventListener('click', this._handleDeleteCard);
    this._imageElem.addEventListener('click', this._handleScaleImage);
  }
  //............................. лайки.................
  updateLikesCount(likes) {
    this._likes = likes;
    this._likeCounter.textContent = likes.length;
  }
  toggleLikeButton() {   // не стал вносить тогл в метод выше так как разные действия на странице
    this._like.classList.toggle('element__like_active');
  }
  isLikedByMe() {
    return this._likes.find(like => like._id === this._myId);
  }
  _checkLiker() {
    this._likes.forEach(elemLike => {
      if (elemLike._id === this._myId) {
        this._like.classList.add('element__like_active')
        return
      }
    })
  }
  //.............................
  createCards() {
    this._cloneElem = this._getCloneTemplate();
    this._imageElem = this._cloneElem.querySelector('.element__photo');
    this._imageElem.src = this._link;
    this._imageElem.alt = this._name;
    this._titleImage = this._cloneElem.querySelector('.element__caption')
    this._titleImage.textContent = this._name;
    this._like = this._cloneElem.querySelector('.element__like');
    this._trash = this._cloneElem.querySelector('.element__garbage');
    this._likeCounter = this._cloneElem.querySelector('.element__like_counter')
    this._likeCounter.textContent = this._likes.length
    if (this._ownerId._id !== this._myId) {
      this._trash.remove()
    }
    this._setEventListener();
    this._checkLiker()
    return this._cloneElem;
  }
}

