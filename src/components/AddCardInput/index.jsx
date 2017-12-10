import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import classnames from 'classnames';

import styles from './addCard.scss';


@observer
class AddCard extends Component {

  @observable isFocused = false;
  @observable inputText = '';

  onInputChange = e => this.inputText = e.target.value;
  setFocus = () => this.isFocused = true;


  onDelete = () => {
    // don't use action as decorator as it will break hot-reloading
    action(() => {
      this.inputText = '';
      this.isFocused = false;
    })();
  };

  onSaveCard = () => {
    const text = this.inputText.trim();
    if (text) {
      action(() => {
        const { createCard, addCardToColumn, columnId } = this.props;
        const cardId = createCard(this.inputText);
        addCardToColumn(columnId, cardId);
        this.inputText = '';
      })();
    }
  };

  onKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.onSaveCard();
    }
  };

  render() {
    const textareaClassName = classnames(styles.addCardTextarea, this.isFocused && styles.active);

    return (
      <div className={styles.container}>
        <textarea
          type='text'
          name='add_card'
          placeholder='Add a card...'
          rows={5}
          value={this.inputText}
          onFocus={this.setFocus}
          onChange={this.onInputChange}
          onKeyPress={this.onKeyPress}
          className={textareaClassName}
        />
        {this.isFocused && (
          <div className={styles.buttonsWrapper}>
            <button onClick={this.onSaveCard} className={styles.saveButton}>
              Add
            </button>
            <button onClick={this.onDelete} className={styles.deleteButton}>
              <i className='material-icons'>clear</i>
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default AddCard