import {
  LOGIN_USER,
  LOGOUT_USER,
  SET_ERROR
} from '../actions/actions';

const initialState = {
  user: {}
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        user: payload.user
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        error: null
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload.error
      };

    default:
      return state;
  }
};

export default user;
