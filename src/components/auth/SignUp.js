import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import MyForm from "./MyForm";

class Login extends Component {
  render() {
    return (
          <MyForm source='signup'/>
    );
  }
}

export default firebaseConnect()(Login);
