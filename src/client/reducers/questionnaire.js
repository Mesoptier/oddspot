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
  answers: [],
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
    const answers = state.answers.slice();

    answers[state.questions[question].questionIndex] = value;

    let currentQuestion = Math.max(state.currentQuestion,
      Math.min(state.questions.length - 1, question + 1));

    while (currentQuestion < state.questions.length &&
        state.questions[currentQuestion].type !== 'question') {
      currentQuestion += 1;
    }

    const completed = state.completed || (question === state.questions.length - 1);

    return {
      ...state,
      answers,
      currentQuestion,
      completed,
    };
  },

}, initialState);
