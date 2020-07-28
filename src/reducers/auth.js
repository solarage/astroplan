import {
  LOGIN_USER,
  LOGOUT_USER
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
        user: null
      };

    default:
      return state;
  }
};

export default user;
