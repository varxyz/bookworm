import React, { Component } from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';

import Header from './Header';
import MainPage from './MainPage';
import { Wrapper, Title, Button } from '../style/styled';
import '../../node_modules/semantic-ui-css/semantic.min.css';
import '../style/style.css';

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header/>
        <MainPage/>
      </Wrapper>
    );
  }
}

export default hot(module)(App);
