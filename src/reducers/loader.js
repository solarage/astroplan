import {
  SHOW_LOADER,
  HIDE_LOADER
} from '../actions/actions';

const initialState = {
  loading: false
};

const loader = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_LOADER:
      return {
        ...state,
        loading: payload.loading
      };
    case HIDE_LOADER:
      return {
        ...state,
        loading: payload.loading
      };

    default:
      return state;
  }
};

export default loader;
