import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Column from 'components/Column';
import AddColumnInput from 'components/AddColumnInput';
import EditCardModal from 'components/EditCardModal';
import styles from './dashboard.scss';


@DragDropContext(HTML5Backend)
@inject('columnsStore')
@observer
class Dashboard extends Component {

  render() {

    const { columns, createColumn } = this.props.columnsStore;

    return (
      <div className={styles.main}>
        <ul className={styles.columnsList}>
          {columns.map((column, index) => (
            <li className={styles.columnWrapper} key={column.id}>
              <Column {...column} columnIndex={index} />
            </li>
          ))}
          <li className={styles.columnWrapper} key={'addColumn'}>
            <AddColumnInput createColumn={createColumn} />
          </li>
        </ul>
        <EditCardModal />
      </div>
    )
  }

}

export default Dashboard;
