import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom'

import classnames from 'classnames';
import styles from './card.scss';
import dragTypes from 'constants/dragSourceTypes';

const cardSource = {
  beginDrag(props) {
    props.cardsStore.setDraggingCard(props.cardId);

    // need this to not use CustomDragLayer
    const cardNode = document.getElementById(props.cardId);
    if (cardNode) {
      cardNode.className = styles.cardContainer;
    }

    return {
      type: dragTypes.CARD_TYPE,
      cardId: props.cardId,
      columnId: props.columnId
    }
  },
  endDrag(props) {
    props.cardsStore.deleteDraggingCard(props.cardId);
    // need this to not use CustomDragLayer
    const cardNode = document.getElementById(props.cardId);
    if (cardNode) {
      cardNode.className = styles.cardContainer;
    }
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const cardItem = monitor.getItem();
    const oldColumnId = cardItem.columnId;
    const newColumnId = props.columnId;
    const dragId = cardItem.cardId;
    const hoverId = props.cardId;

    // Determine column on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    // Get vertical middle
    const hoverMiddleY = hoverBoundingRect.y + hoverBoundingRect.height / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Whether to place dragging card below hovered
    const isBelow = clientOffset.y >= hoverMiddleY;

    // // Don't replace items with themselves
    if (dragId === hoverId) {
      return
    }

    // Time to actually perform the action
    props.columnsStore.moveCard(dragId, hoverId, oldColumnId, newColumnId, isBelow);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    // cardItem.cardId = hoverId;
    cardItem.columnId = newColumnId;
  },
};


@inject('columnsStore', 'cardsStore', 'uiStore')
@DragSource(dragTypes.CARD_TYPE, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@DropTarget(dragTypes.CARD_TYPE, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@observer
class Card extends Component {
  getCard = () => this.props.cardsStore.getCard(this.props.cardId);
  onEditCard = () => {
    const card = this.getCard();
    this.props.uiStore.setEditingCard(card, this.props.columnId);
  };


  render() {
    const { connectDragSource, connectDropTarget, cardId } = this.props;
    const { text, color } = this.getCard();

    const { draggingCard } = this.props.cardsStore;

    const containerClassName = classnames(
      styles.cardContainer,
      cardId === draggingCard && styles.isDragging
    );
    const style = { backgroundColor: color };

    return connectDragSource(
      connectDropTarget(
        <div className={containerClassName} style={style} id={cardId}>
          {text}
          <button className={styles.editCardButton} onClick={this.onEditCard}>
            <i className='material-icons'>edit</i>
          </button>
        </div>
      )
    )
  }
}

export default Card