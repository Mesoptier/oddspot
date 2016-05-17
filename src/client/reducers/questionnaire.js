import { createAction, handleActions } from 'redux-actions';

// Actions
const SET_QUESTIONS = 'questionnaire/SET_QUESTIONS';
const SET_CURRENT_QUESTION = 'questionnaire/SET_CURRENT_QUESTION';
const ANSWER_QUESTION = 'questionnaire/ANSWER_QUESTION';

export const setQuestions = createAction(SET_QUESTIONS);
export const setCurrentQuestion = createAction(SET_CURRENT_QUESTION);
export const answerQuestion = createAction(ANSWER_QUESTION);

// Initial state
const initialState = {
  questions: [],
  currentQuestion: 0,
  completed: false,
};

// Reducers
export default handleActions({

  [SET_QUESTIONS]: (state, { payload }) => ({
    ...state,
    questions: payload,
  }),

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

    const currentQuestion = Math.max(state.currentQuestion,
      Math.min(questions.length - 1, question + 1));

    const completed = (question === questions.length - 1);

    return {
      ...state,
      questions,
      currentQuestion,
      completed,
    };
  },

}, initialState);
