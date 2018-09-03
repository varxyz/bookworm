import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Card, Button, Form } from 'semantic-ui-react';
import MyForm from "./MyForm";

class Login extends Component {
  render() {
    return (
          <MyForm />
    );
  }
}

export default firebaseConnect()(Login);
