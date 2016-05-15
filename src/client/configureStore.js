import { createStore, combineReducers } from 'redux';
import questionnaire from './reducers/questionnaire';

export default function configureStore(initialState) {
  const reducer = combineReducers({
    questionnaire,
  });

  const enhancer = window.devToolsExtension ? window.devToolsExtension() : undefined;

  return createStore(reducer, initialState, enhancer);
}
