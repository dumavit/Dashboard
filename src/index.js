import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import Dashboard from 'components/Dashboard';
import ColumnsStore from 'stores/ColumnsStore';
import CardsStore from 'stores/CardsStore';
import UIStore from 'stores/UIStore';

import { addFakeData } from 'utils';

import 'shared/styles/reset.scss';
import 'shared/styles/index.scss';


const columnsStore = new ColumnsStore();
const cardsStore = new CardsStore();
const uiStore = new UIStore();

const stores = { columnsStore, cardsStore, uiStore };

addFakeData(columnsStore, cardsStore); //


render(
  <div>
    <Provider {...stores}>
      <Dashboard />
    </Provider>
  </div>,
  document.getElementById('root'),
);

