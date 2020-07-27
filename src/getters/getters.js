import { getter as G, firstOf, eql } from '../utils/utils';

/* Modules */
const getAuth = G('auth');
const getTasks = G('tasks');
const getModal = G('modal');
const getLoader = G('loader');
const getUI = G('ui');

/* User */
const getUser = firstOf(G('user'), G('auth.user'));

/* Tasks */
const getTodosList = firstOf(G('todos'), G('tasks.todos'));

const checkDisplayMode = eql('mode', 'display');
const checkCreateMode = eql('mode', 'create');
const checkEditMode = eql('mode', 'edit');

/* Modal */
const getModalSettings = firstOf(G('settings'), G('modal.settings'));
const getType = G('type');
const getTitle = G('title');
const getMessage = G('message');
const getVisibility = G('visible');

/* Loader */
const getLoading = G('loading');

/* UI */
const getAppTitle = firstOf(G('appTitle'), G('ui.appTitle'));
const getSignInBtnTitle = firstOf(
  G('signInBtnTitle'), G('ui.signInBtnTitle')
);
const getRegisterBtnTitle = firstOf(
  G('registerBtnTitle'), G('ui.registerBtnTitle')
);
const getSignOutBtnTitle = firstOf(
  G('signOutBtnTitle'),
  G('ui.signOutBtnTitle')
);
const getDefaultFormText = firstOf(
  G('defaultFormText'), G('ui.defaultFormText')
);
const getRemoveBtnTitle = firstOf(
  G('removeBtnTitle'), G('ui.removeBtnTitle')
);
const getAuthFormWarning = firstOf(
  G('authFormWarning'), G('ui.authFormWarning')
);

export {
  getAuth,
  getTasks,
  getModal,
  getLoader,
  getUI,

  getUser,

  getTodosList,
  checkDisplayMode,
  checkCreateMode,
  checkEditMode,

  getModalSettings,
  getType,
  getTitle,
  getMessage,
  getVisibility,

  getLoading,

  getAppTitle,
  getSignInBtnTitle,
  getRegisterBtnTitle,
  getSignOutBtnTitle,
  getDefaultFormText,
  getRemoveBtnTitle,
  getAuthFormWarning
};
