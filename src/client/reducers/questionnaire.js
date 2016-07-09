import { createAction, handleActions } from 'redux-actions';

// Actions
const SET_QUESTIONNAIRE = 'questionnaire/SET_QUESTIONNAIRE';
const SET_CURRENT_QUESTION = 'questionnaire/SET_CURRENT_QUESTION';
const ANSWER_QUESTION = 'questionnaire/ANSWER_QUESTION';
const CALCULATE_RESULTS = 'questionnaire/CALCULATE_RESULTS';

export const setQuestionnaire = createAction(SET_QUESTIONNAIRE);
export const setCurrentQuestion = createAction(SET_CURRENT_QUESTION);
export const answerQuestion = createAction(ANSWER_QUESTION);
export const calculateResults = createAction(CALCULATE_RESULTS);

// Initial state
const initialState = {
  globalFunction: null,
  constants: {},
  questions: [],
  answers: [],
  totalQuestions: 0,
  currentQuestion: 0,
  completed: false,
};

// Utilities
const functionMap = {
  'sqrt': 'Math.sqrt',
  'pow': 'Math.pow',
  'abs': 'Math.abs',
};

const functionRegex = new RegExp(Object.keys(functionMap).join('|'), 'gi');

function parseFormula(formula) {
  const preparedFormula = formula
    .replace(/\$([a-zA-Z0-9_]+)/g, 'variables[\'$1\']')
    .replace(functionRegex, (name) => functionMap[name]);

  return new Function('variables', `return ${preparedFormula};`);
}

function applyHeuristic(heuristic, score) {
  return parseFormula(heuristic)({ x: score });
}

function createDescription(score, name) {
  let description = `Op een schaal van 0 tot 100, waarbij 0 betekent dat u niet in gevaar bent voor
    ${name}, <strong>scoort u een ${Math.round(score * 100)}.</strong>`;

  return description;
}

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
      constants: payload.constants,
      globalFunction: payload.global_function,
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

  [CALCULATE_RESULTS]: (state, { payload }) => {
    const results = {};

    ['ak', 'bcc'].forEach((type) => {
      let score = state.answers.reduce((score, answer, questionIndex) => {
        const question = state.questions.find((question) => question.questionIndex === questionIndex);
        const weight = question.weights[type];
        const { fnc } = question.settings;

        let localScore = answer;

        if (fnc) {
          localScore = applyHeuristic(fnc, localScore);
        }

        return score + (localScore * weight);
      }, 0);

      if (state.globalFunction) {
        score = applyHeuristic(state.globalFunction, score);
      }

      const name = (type === 'ak')
        ? 'Actinische Keratose'
        : 'Basaalcelcarcinoom';

      const description = createDescription(score, name);
      
      let level;
      
      if (score <= 0.2) {
        level = 'normal';
      } else if ((type === 'ak' && score <= 0.75) || (type === 'bcc' && score <= 0.8)){
        level = 'warning';
      } else {
        level = 'danger';
      }

      results[type] = {
        score,
        level,
        name,
        description,
      };
    });

    return {
      ...state,
      results,
    };
  },

}, initialState);
