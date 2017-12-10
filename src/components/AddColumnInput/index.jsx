import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

import { COLUMN_WIDTH, COLUMN_TITLE_HEIGHT } from 'constants';
import styles from './addColumn.scss';

const containerStyle = { width: COLUMN_WIDTH, height: COLUMN_TITLE_HEIGHT };

@observer
class AddColumnInput extends Component {

  @observable inputText = '';

  // don't need @action decorator when only one observable is updated
  onInputChange = e => this.inputText = e.target.value;

  onKeyPress = e => {
    if (e.key === 'Enter') {
      const { createColumn } = this.props;
      const columnTitle = this.inputText.trim();
      if (columnTitle) {
        createColumn(columnTitle);
        this.inputText = '';
      }
    }
  };

  render() {

    return (
      <div style={containerStyle}>
        <input
          type='text'
          name='add_column'
          placeholder='Add a list...'
          value={this.inputText}
          onChange={this.onInputChange}
          onKeyPress={this.onKeyPress}
          className={styles.addColumnInput}
        />
      </div>
    )
  }
}

export default AddColumnInput