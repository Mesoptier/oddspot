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
const initialData = window.INITIAL_DATA;
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
