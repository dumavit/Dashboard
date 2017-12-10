import React from 'react';

import styles from '../column.scss';
import { COLUMN_TITLE_HEIGHT, COLUMN_TITLE_PADDING } from 'constants';


const columnTitleStyle = {
  height: COLUMN_TITLE_HEIGHT,
  maxHeight: COLUMN_TITLE_HEIGHT,
  padding: COLUMN_TITLE_PADDING,
  display: 'flex'
};

const ColumnTitle = ({ title, onChange, onDelete }) => (
  <div className={styles.columnTitle} style={columnTitleStyle}>
    <textarea
      value={title}
      onChange={onChange}
      onKeyPress={onChange}
      className={styles.titleTextarea}
    />
    <button className={styles.deleteButton} onClick={onDelete}>
      <i className='material-icons'>clear</i>
    </button>

  </div>
);


export default ColumnTitle