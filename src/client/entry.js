import 'react-hot-loader/patch';

import './styles/base.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './configureStore';
import { setQuestionnaire } from './reducers/questionnaire';

import Root from './Root.jsx';

const store = configureStore();
const history = syncHistoryWithStore(createMemoryHistory(), store);

// Set initial data
const initialData = window.INITIAL_DATA;
store.dispatch(setQuestionnaire(initialData.questionnaire));

const root = document.getElementById('root');

ReactDOM.render((
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>
), root);

if (module.hot) {
  module.hot.accept('./Root.jsx', () => {
    const NewRoot = require('./Root.jsx').default;

    ReactDOM.render((
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>
    ), root);
  });
}
