import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import ClientApp from './containers/ClientApp.jsx';

const initialState = {
  questions: {
    questions: [
      {
        title: 'Title',
        description: 'Description',
        choices: [
          { label: 'A' },
          { label: 'B' },
          { label: 'C' },
          { label: 'D' },
        ],
        value: 0, // default: null
      },
    ],
    currentQuestion: 0, // default: null
  },
};

const store = configureStore(initialState);
const root = document.getElementById('root');

ReactDOM.render((
  <Provider store={store}>
    <ClientApp />
  </Provider>
), root);
