import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { isEmpty } from './utils/utils';

import useStore from './hooks/useStore';
import {
  initAuth,
  getTodos
} from './actions/actions';
import { getAppTitle, getUser } from './getters/getters';

import Home from './containers/Home.jsx';
import Auth from './containers/Auth.jsx'
import TodoDetails from './containers/TodoDetails';
import Modal from './components/Modal.jsx'
import Loader from './components/Loader.jsx'

import space from './media/space.mp4';

import './App.scss';

export default function App() {
  const { state, actions } = useStore(state => state,
    {
      initAuth,
      getTodos
    });
  const user = getUser(state);
  const title = getAppTitle(state);
  const isAuth = !isEmpty(user);

  useEffect(() => {
    actions.initAuth();
  }, []);

  useEffect(() => {
    if (isAuth) actions.getTodos(user.uid);
  }, [user]);

  return (
    <div className="App">
      <div className="bg-container">
        <video className="bg-video" playsInline autoPlay muted loop>
          <source src={space} />
        </video>
        <div className="bg-photo" />
      </div>
      <header className="App-header">
        <h1>{title}</h1>
      </header>

      <Modal />
      <Loader />

      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/todo/:id" component={TodoDetails} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </div>
  );
}
