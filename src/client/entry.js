import './styles/base.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './configureStore';
// import { setPage } from './reducers/router';
import { setQuestions } from './reducers/questionnaire';

import ClientApp from './containers/ClientApp.jsx';
import Home from './pages/Home.jsx';
import Questionnaire from './pages/Questionnaire.jsx';
import Results from './pages/Results.jsx';

const store = configureStore();
const history = syncHistoryWithStore(createMemoryHistory(), store);

// Set initial data
// const initialData = window.INITIAL_DATA;
const initialData = {
  questionnaire: {
    questions: [
      {
        type: 'question',
        questionIndex: 0,
        question: 'What age are you?',
        questionType: 'number',
        inputPlaceholder: 'Age',
      },
      {
        type: 'question',
        questionIndex: 0,
        question: 'What age are you?',
        questionType: 'number',
      },
      {
        type: 'question',
        questionIndex: 1,
        question: 'Are you male or female?',
        description: null,
        choices: [
          {
            label: 'Male',
            value: 0
          },
          {
            label: 'Female',
            value: 1
          }
        ]
      },
      {
        type: 'question',
        questionIndex: 2,
        question: 'Have you, during your leisure time and before the age of 65, frequently been exposed to sunlight?',
        description: null,
        choices: [
          {
            label: 'Yes',
            value: 0
          },
          {
            label: 'No',
            value: 1
          },
          {
            label: 'Don\'t know',
            value: 2
          }
        ]
      },
      {
        type: 'question',
        questionIndex: 3,
        question: 'Have you frequently been on a sun-vacation?',
        description: '(to tan)',
        choices: [
          {
            label: 'Often',
            value: 0
          },
          {
            label: 'Regularly',
            value: 1
          },
          {
            label: 'Sometimes',
            value: 2
          },
          {
            label: 'Rarely',
            value: 3
          },
          {
            label: 'Never',
            value: 4
          }
        ]
      },
      {
        type: 'help',
        help: 'Choose a spot on your skin which you would like to diagnose'
      },
      {
        type: 'question',
        questionIndex: 4,
        question: 'Are you male or female?',
        description: null,
        choices: [
          {
            label: 'Male',
            value: 0
          },
          {
            label: 'Female',
            value: 1
          }
        ]
      },
    ]
  }
};

store.dispatch(setQuestions(initialData.questionnaire.questions));

const root = document.getElementById('root');

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={ClientApp}>
        <IndexRoute component={Home} />
        <Route path="questionnaire" component={Questionnaire} />
        <Route path="results" component={Results} />
      </Route>
    </Router>
  </Provider>
), root);
