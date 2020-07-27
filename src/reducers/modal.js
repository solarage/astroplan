import {
  SHOW_MODAL,
  CLOSE_MODAL
} from '../actions/actions';

const initialState = {
  visible: false,
  settings: {
    create: {
      type: 'create',
      title: 'Hi there!',
      message: 'Your request will be heard'
    },
    edit: {
      type: 'edit',
      title: 'Hi there!',
      message: 'EDITED'
    },
    delete: {
      type: 'delete',
      title: '',
      message: 'GONE'
    }
  }
};

const modal = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_MODAL:
      return {
        ...state,
        visible: payload.visible,
        ...payload.settings
      };
    case CLOSE_MODAL:
      return {
        ...state,
        visible: payload.visible
      };

    default:
      return state;
  }
};

export default modal;
