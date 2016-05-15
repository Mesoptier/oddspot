import { createAction, handleActions } from 'redux-actions';

// Actions
const SET_CURRENT_QUESTION = 'questionnaire/SET_CURRENT_QUESTION';
const ANSWER_QUESTION = 'questionnaire/ANSWER_QUESTION';

export const setCurrentQuestion = createAction(SET_CURRENT_QUESTION);
export const answerQuestion = createAction(ANSWER_QUESTION);

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

  [ANSWER_QUESTION]: (state, { payload }) => {
    const { question, value } = payload;
    const questions = state.questions.slice();

    questions[question] = {
      ...questions[question],
      value,
    };

    const currentQuestion = Math.max(state.currentQuestion, question + 1);

    return {
      ...state,
      questions,
      currentQuestion,
    };
  },

}, initialState);
