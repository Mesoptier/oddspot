import { createStore, combineReducers } from 'redux';
import questionnaire from './reducers/questionnaire';
import router from './reducers/router';

export default function configureStore(initialState) {
  const reducer = combineReducers({
    questionnaire,
    router,
  });

  const enhancer = window.devToolsExtension ? window.devToolsExtension() : undefined;

  return createStore(reducer, initialState, enhancer);
}
