import './styles/base.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { setQuestions } from './reducers/questionnaire';
import ClientApp from './containers/ClientApp.jsx';

const store = configureStore();

// Set initial data
const initialData = window.INITIAL_DATA;
store.dispatch(setQuestions(initialData.questionnaire.questions));

const root = document.getElementById('root');

ReactDOM.render((
  <Provider store={store}>
    <ClientApp />
  </Provider>
), root);
