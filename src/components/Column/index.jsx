import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classnames from 'classnames';

import Card from 'components/Card';
import AddCardInput from 'components/AddCardInput';
import ColumnTitle from './ColumnTitle';
import styles from './column.scss';
import { COLUMN_WIDTH, COLUMN_TITLE_HEIGHT, COLUMN_TITLE_PADDING } from 'constants';
import dragTypes from 'constants/dragSourceTypes';


const columnContainerStyle = {
  width: COLUMN_WIDTH
};


const columnSource = {
  beginDrag(props) {
    return {
      columnId: props.id,
      columnIndex: props.columnIndex,
    }
  },
};

const target = {
  hover(props, monitor, component) {
    const item = monitor.getItem();
    if (item.type === dragTypes.CARD_TYPE) {
      // handle dragging card on column title
      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      // if card is dragged on column title
      if (clientOffset.y < hoverBoundingRect.y + COLUMN_TITLE_HEIGHT + 2 * COLUMN_TITLE_PADDING) {
        const oldColumnId = item.columnId;
        const newColumnId = props.id;
        props.columnsStore.moveCard(item.cardId, 0, oldColumnId, newColumnId);
        item.columnId = newColumnId;
      }
    }

    else {

      const dragIndex = item.columnIndex
      const hoverIndex = props.columnIndex

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Time to actually perform the action
      props.columnsStore.moveColumn(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.columnIndex = hoverIndex
    }

  },
};

@DragDropContext(HTML5Backend)
@inject('columnsStore', 'cardsStore')
@DropTarget([dragTypes.COLUMN_TYPE, dragTypes.CARD_TYPE], target, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(dragTypes.COLUMN_TYPE, columnSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@observer
class Column extends Component {


  changeColumnTitle = e => {
    if (e.key) {
      if (e.key === 'Enter') {
        e.target.blur();
      }
    } else {
      const { id: columnId, columnsStore } = this.props;
      columnsStore.changeColumnTitle(columnId, e.target.value);
    }
  };

  onColumnDelete = () => {
    const { cardsIds } = this.props;
    this.props.columnsStore.deleteColumn(this.props.id);
    this.props.cardsStore.deleteCards(cardsIds);
  };

  render() {
    const {
      title, id, cardsIds, cardsStore, columnsStore,
      connectDragSource, connectDropTarget, isDragging
    } = this.props;
    const { createCard } = cardsStore;
    const { addCardToColumn } = columnsStore;

    const containerClassName = classnames(styles.columnContainer, isDragging && styles.isDragging);

    return connectDragSource(
      connectDropTarget(
        <div className={containerClassName} style={columnContainerStyle}>
          <ColumnTitle
            title={title}
            onChange={this.changeColumnTitle}
            onDelete={this.onColumnDelete}
          />

          <ul className={styles.cardsContainer}>
            {cardsIds.map(cardId => (
                <li className={styles.cardWrapper} key={cardId}>
                  <Card cardId={cardId} columnId={id} />
                </li>
              )
            )}
            <li className={styles.cardWrapper} key={'addCard'}>
              <AddCardInput
                columnId={id}
                createCard={createCard}
                addCardToColumn={addCardToColumn}
              />
            </li>
          </ul>
        </div>
      )
    )
  }
}

export default Column