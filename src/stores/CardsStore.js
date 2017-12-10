import { observable, computed, action } from 'mobx';
import uuid from 'uuid';

import { DEFAULT_CARD_COLOR } from 'constants';

export default class CardsStore {
  @observable cards = [];

  // id of the card being dragged
  @observable draggingCard = '';


  @action.bound
  createCard(text = '') {
    const card = {
      id: uuid(),
      text,
      color: DEFAULT_CARD_COLOR
    };
    this.cards.push(card);
    return card.id;
  }


  getCard = cardId => this.cards.find(card => card.id === cardId);


  @action.bound
  setDraggingCard(cardId) {
    this.draggingCard = cardId;
  }


  @action.bound
  deleteDraggingCard() {
    this.draggingCard = '';
  }


  @action.bound
  deleteCards(cardsIds) {
    this.cards = this.cards.filter(card => !cardsIds.includes(card.id));
  }

  @action.bound
  changeCard (editedCard) {
    const card = this.getCard(editedCard.id);
    card.text = editedCard.text;
    card.color = editedCard.color;
  }

}
