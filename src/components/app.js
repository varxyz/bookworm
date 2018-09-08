import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from '../utils/auth';
import Header from './Header';
import MainPage from './MainPage';
import Login from './auth/Login';
import PageNotFound from './PageNotFound';
import { Wrapper } from '../style/styled';
import '../../node_modules/semantic-ui-css/semantic.min.css';
import '../style/style.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/bookworm">
        <Wrapper>
          <Header/>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/watchlist" component={UserIsAuthenticated(() => <h1>nothing here</h1>)} />
            <Route path="/login" component={UserIsNotAuthenticated(Login)} />
            <Route component={PageNotFound} />
          </Switch>
        </Wrapper>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
