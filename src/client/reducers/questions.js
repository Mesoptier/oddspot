import { createAction, handleActions } from 'redux-actions';

// Actions
const SET_CURRENT_QUESTION = 'questions/SET_CURRENT_QUESTION';

export const setCurrentQuestion = createAction(SET_CURRENT_QUESTION);

// Initial state
const initialState = {
  questions: [],
  currentQuestion: 0,
};

// Reducers
export default handleActions({

  [SET_CURRENT_QUESTION]: (state, { payload }) => ({
    ...state,
    currentQuestion: payload,
  }),

}, initialState);
