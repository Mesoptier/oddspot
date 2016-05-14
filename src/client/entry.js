import './styles/base.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import ClientApp from './containers/ClientApp.jsx';

const initialState = {
  questions: {
    questions: [
      {
        title: 'Are you male or female?',
        choices: [
          { label: 'Male', value: 0 },
          { label: 'Female', value: 1 },
        ],
      },
      {
        title: 'Have you, during your leisure time and before the age of 65, frequently been exposed to sunlight?',
        choices: [
          { label: 'Yes', value: 0 },
          { label: 'No', value: 1 },
          { label: 'Don\'t know', value: 2 },
        ],
      },
      {
        title: 'Have you frequently been on a sun-vacation?',
        description: '(to tan)',
        choices: [
          { label: 'Often', value: 0 },
          { label: 'Regularly', value: 1 },
          { label: 'Sometimes', value: 2 },
          { label: 'Rarely', value: 3 },
          { label: 'Never', value: 4 },
        ],
      },
    ],
  },
};

const store = configureStore(initialState);
const root = document.getElementById('root');

ReactDOM.render((
  <Provider store={store}>
    <ClientApp />
  </Provider>
), root);
