import { observable, action } from 'mobx';
import uuid from 'uuid';

export default class ColumnsStore {
  @observable columns = [];

  getColumn = columnId => this.columns.find(column => column.id === columnId);


  // arrow function in order to save context
  @action.bound
  createColumn(title) {
    const column = {
      id: uuid(),
      title,
      cardsIds: [],
    };
    this.columns.push(column);
  }


  @action.bound
  changeColumnTitle(columnId, title) {
    const column = this.getColumn(columnId);
    column.title = title;
  }

  @action.bound
  moveColumn(dragIndex, hoverIndex) {
    const dragColumn = this.columns[dragIndex];
    this.columns[dragIndex] = this.columns[hoverIndex];
    this.columns[hoverIndex] = dragColumn;
  }

  @action.bound
  changeCardColumn(cardId, oldColumnId, newColumnId) {
    this.columns.forEach((column) => {
      if (column.id === oldColumnId) {
        column.cardsIds = column.cardsIds.filter(id => id !== cardId);
      }

      if (column.id === newColumnId && !column.cardsIds.includes(cardId)) {
        column.cardsIds.push(cardId);
      }
    });
  }

  @action.bound
  moveCard(dragId, hoverId, oldColumnId, newColumnId, isBelow = false) {
    this.columns.forEach((column) => {
      if (column.id === oldColumnId) {
        column.cardsIds = column.cardsIds.filter(id => id !== dragId);
      }
      if (column.id === newColumnId) {
        const { cardsIds } = column;
        let index = hoverId
          ? cardsIds.findIndex(id => id === hoverId)
          : 0;
        if (isBelow) {
          index += 1;
        }

        if (!cardsIds.includes(dragId)) {
          const newCardsIds = cardsIds.concat();
          newCardsIds.splice(index, 0, dragId);
          column.cardsIds = newCardsIds;
        }
      }
    });
  }

  @action.bound
  addCardToColumn(columnId, cardId) {
    const column = this.getColumn(columnId);
    column.cardsIds.push(cardId);
  }

  @action.bound
  deleteColumn(columnId) {
    this.columns = this.columns.filter(column => column.id !== columnId);
  }

  @action.bound
  deleteCardIdFromColumn(columnId, cardId) {
    const column = this.getColumn(columnId);
    column.cardsIds = column.cardsIds.filter(card => card !== cardId);
  }
}

