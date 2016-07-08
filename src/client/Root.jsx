import React from 'react';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route } from 'react-router';

import ClientApp from './containers/ClientApp.jsx';
import Home from './pages/Home.jsx';
import Questionnaire from './pages/Questionnaire.jsx';
import Results from './pages/Results.jsx';

const routes = (
  <Route path="/" component={ClientApp}>
    <IndexRoute component={Home}/>
    <Route path="questionnaire" component={Questionnaire}/>
    <Route path="results" component={Results}/>
  </Route>
);

export default function Root({ store, history }) {
  return (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  );
}
