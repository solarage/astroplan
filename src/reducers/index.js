import { combineReducers } from 'redux';
import auth from './auth';
import tasks from './tasks';
import modal from './modal';
import loader from './loader';
import ui from './ui';

const rootReducer = combineReducers({
  auth, tasks, modal, loader, ui
});

export default rootReducer;
