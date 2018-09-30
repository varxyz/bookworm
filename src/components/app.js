import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from '../utils/auth';
import Header from './Header';
import MainPage from './MainPage';
import Watchlist from './Watchlist';
import Readlist from './Readlist';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import PageNotFound from './PageNotFound';
import { Wrapper } from '../style/styled';
import '../../node_modules/semantic-ui-css/semantic.min.css';
import '../style/style.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Wrapper>
          <Header/>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/book/:id" component={MainPage} />
            <Route exact path="/watchlist" component={UserIsAuthenticated(Watchlist)} />
            <Route exact path="/watchlist/:id" component={UserIsAuthenticated(MainPage)} />
            <Route exact path="/mybooks" component={UserIsAuthenticated(Readlist)} />
            <Route exact path="/mybooks/:id" component={UserIsAuthenticated(MainPage)} />
            <Route path="/login" component={UserIsNotAuthenticated(Login)} />
            <Route path="/signup" component={UserIsNotAuthenticated(SignUp)} />
            <Route component={PageNotFound} />
          </Switch>
        </Wrapper>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
