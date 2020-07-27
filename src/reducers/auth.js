import {
  LOGIN_USER,
  LOGOUT_USER
} from '../actions/actions';

const initialState = {
  user: null,
  signInBtnTitle: 'SignIn',
  registerBtnTitle: 'Register',
  signOutBtnTitle: 'SignOut'
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
