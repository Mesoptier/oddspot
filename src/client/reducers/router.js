import { createAction, handleActions } from 'redux-actions';

// Actions
const SET_PAGE = 'pages/SET_PAGE';

export const setPage = createAction(SET_PAGE);

// Initial state
const initialState = {
  currentPage: null,
};

// Reducers
export default handleActions({

  [SET_PAGE]: (state, { payload }) => ({
    ...state,
    currentPage: payload,
  }),

}, initialState);
