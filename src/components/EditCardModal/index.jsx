import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import Modal from 'react-modal';
import { GithubPicker } from 'react-color';

import styles from './editCardModal.scss';

Modal.setAppElement(document.getElementById('root'));

// import styles from './editCardModal.scss';
const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    backgroundColor: '#e2e4e6',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  }
};

const colors = [
  '#FFF', '#FCCB00', '#EB9694', '#FAD0C3', '#FEF3BD',
  '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB',
  '#9575CD'
];


@inject('columnsStore', 'cardsStore', 'uiStore')
@observer
class EditCardModal extends Component {

  handleClose = () => this.props.uiStore.cancelEditing();
  onChange = e => this.props.uiStore.changeEditingCardText(e.target.value);

  onDeleteCard = () => {
    action(() => {
      const { uiStore, columnsStore, cardsStore } = this.props;
      const { editingCard, editingCardColumnId } = uiStore;
      columnsStore.deleteCardIdFromColumn(editingCardColumnId, editingCard.id);
      cardsStore.deleteCards([editingCard.id]);
      this.handleClose();
    })();
  };

  onSaveCard = () => {
    const { uiStore, cardsStore } = this.props;
    const { editingCard } = uiStore;
    const text = editingCard.text.trim();
    if (text) {
      cardsStore.changeCard(editingCard);
      this.handleClose();
    }
  };

  onColorChange = color => this.props.uiStore.changeEditingCardColor(color.hex);


  render() {
    const { editingCard: card } = this.props.uiStore;

    return (
      <Modal
        isOpen={!!card}
        onRequestClose={this.handleClose}
        closeTimeoutMS={100}
        contentLabel='Edit card'
        style={modalStyle}
      >
        {card && (
          <div>
            <h2>Edit card</h2>
            <textarea
              type='text'
              name='add_card'
              placeholder='Card text...'
              rows={5}
              value={card.text}
              spellCheck={false}
              onChange={this.onChange}
              style={{ backgroundColor: card.color }}
              className={styles.editCardTextarea}
            />
            <GithubPicker
              width={290}
              onChange={this.onColorChange}
              colors={colors}
            />
            <div className={styles.buttonsWrapper}>
              <button onClick={this.onSaveCard} className={styles.saveButton}>
                Save
              </button>
              <button onClick={this.handleClose} className={styles.closeButton}>
                <i className='material-icons'>clear</i>
              </button>
              <button onClick={this.onDeleteCard} className={styles.deleteButton}>
                <i className="material-icons">delete_forever</i>
              </button>
            </div>
          </div>
        )}
      </Modal>
    )
  }
}

export default EditCardModal