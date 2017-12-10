export const addFakeData = (columnsStore, cardsStore) => {
  columnsStore.createColumn('TODO');
  columnsStore.createColumn('IN PROGRESS');
  columnsStore.createColumn('QA');
  columnsStore.createColumn('DONE');

  cardsStore.createCard('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
  cardsStore.createCard('Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
  cardsStore.createCard('Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');
  cardsStore.createCard('Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum');
  cardsStore.createCard('Short card :)');
  cardsStore.createCard('Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.');
  cardsStore.createCard('Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt');
  cardsStore.createCard(' Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem');
  cardsStore.createCard(' Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur');
  cardsStore.createCard('Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur');





  const { cards } = cardsStore;
  const { columns } = columnsStore;
  columnsStore.addCardToColumn(columns[0].id, cards[0].id);
  columnsStore.addCardToColumn(columns[0].id, cards[1].id);
  columnsStore.addCardToColumn(columns[0].id, cards[2].id);
  columnsStore.addCardToColumn(columns[0].id, cards[3].id);
  columnsStore.addCardToColumn(columns[1].id, cards[4].id);
  columnsStore.addCardToColumn(columns[1].id, cards[5].id);
  columnsStore.addCardToColumn(columns[2].id, cards[6].id);
  columnsStore.addCardToColumn(columns[3].id, cards[7].id);
  columnsStore.addCardToColumn(columns[3].id, cards[8].id);
  columnsStore.addCardToColumn(columns[3].id, cards[9].id);

};