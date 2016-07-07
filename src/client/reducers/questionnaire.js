import { createAction, handleActions } from 'redux-actions';

// Actions
const SET_QUESTIONNAIRE = 'questionnaire/SET_QUESTIONNAIRE';
const SET_CURRENT_QUESTION = 'questionnaire/SET_CURRENT_QUESTION';
const ANSWER_QUESTION = 'questionnaire/ANSWER_QUESTION';

export const setQuestionnaire = createAction(SET_QUESTIONNAIRE);
export const setCurrentQuestion = createAction(SET_CURRENT_QUESTION);
export const answerQuestion = createAction(ANSWER_QUESTION);

// Initial state
const initialState = {
  questions: [],
  answers: [],
  totalQuestions: 0,
  currentQuestion: 0,
  completed: false,
};

// Reducers
export default handleActions({

  [SET_QUESTIONNAIRE]: (state, { payload }) => {
    const questions = Object.keys(payload.questions)
      .map((id) => payload.questions[id])
      .sort((question1, question2) => question1.order - question2.order);

    let totalQuestions = 0;

    questions.forEach((question) => {
      if (question.type !== 'message') {
        totalQuestions++;
        question.questionIndex = totalQuestions;
      }

      if (question.choices) {
        question.choices = Object.keys(question.choices)
          .map((id) => question.choices[id])
          .sort((choice1, choice2) => choice1.order - choice2.order);
      }
    });

    return {
      ...state,
      questions,
      totalQuestions,
    };
  },

  [SET_CURRENT_QUESTION]: (state, { payload }) => ({
    ...state,
    currentQuestion: payload,
  }),

  [ANSWER_QUESTION]: (state, { payload }) => {
    const { question, value: _value } = payload;
    const answers = state.answers.slice();

    // Parse value
    let value;

    if (state.questions[question].type === 'integer') {
      if (_value) {
        value = parseInt(_value);
      } else {
        return state;
      }
    } else {
      value = _value;
    }

    // Set value
    answers[state.questions[question].questionIndex] = value;

    let currentQuestion = Math.max(state.currentQuestion,
      Math.min(state.questions.length - 1, question + 1));

    while (currentQuestion < state.questions.length - 1 &&
        state.questions[currentQuestion].type === 'message') {
      currentQuestion += 1;
    }

    const completed = state.completed
      || (question === state.questions.length - 1)
      || (currentQuestion === state.questions.length - 1 && state.questions[currentQuestion].type === 'message');

    return {
      ...state,
      answers,
      currentQuestion,
      completed,
    };
  },

}, initialState);
