import { observable, action, toJS } from 'mobx';


export default class UIStore {
  // the card currently being edited
  @observable editingCard = null;

  // keep this to find this card in columns faster while deleting
  @observable editingCardColumnId = '';

  @action.bound
  setEditingCard(card, columnId) {
    this.editingCard = toJS(card);
    this.editingCardColumnId = columnId;
  }

  @action.bound
  changeEditingCardText(text) {
    this.editingCard.text = text;
  }

  @action.bound
  changeEditingCardColor(color) {
    this.editingCard.color = color;
  }

  @action.bound
  cancelEditing() {
    this.editingCard = null;
    this.editingCardColumnId = '';
  }
}
