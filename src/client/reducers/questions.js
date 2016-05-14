import { createAction, handleActions } from 'redux-actions';

// Actions
const SET_CURRENT_QUESTION = 'questions/SET_CURRENT_QUESTION';
const SET_VALUE = 'questions/SET_VALUE';

export const setCurrentQuestion = createAction(SET_CURRENT_QUESTION);
export const setValue = createAction(SET_VALUE);

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

  [SET_VALUE]: (state, { payload }) => {
    const { question, value } = payload;
    const questions = state.questions.slice();

    questions[question] = {
      ...questions[question],
      value,
    };

    return {
      ...state,
      questions,
    };
  },

}, initialState);
