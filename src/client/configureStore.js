import { createStore, combineReducers } from 'redux';
import questions from './reducers/questions';

export default function configureStore(initialState) {
  const reducer = combineReducers({
    questions,
  });

  const enhancer = window.devToolsExtension ? window.devToolsExtension() : undefined;

  return createStore(reducer, initialState, enhancer);
}
