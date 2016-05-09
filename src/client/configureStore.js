import { createStore, combineReducers } from 'redux';
import questions from './reducers/questions';

export default function configureStore(initialState) {
  const reducer = combineReducers({
    questions,
  });

  return createStore(reducer, initialState);
}
