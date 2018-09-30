import React from 'react';
import { Formik } from 'formik';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux'
import { connect } from 'react-redux'


class testform extends React.Component {
  state={email:'', password: ''}
  onChange = e => this.setState({[e.target.name]: e.target.value})
  onSubmit = e => {
    e.preventDefault();
    const  hui = this.props.firebase
    const {email, password} = this.state;
    hui.login({email, password}).catch(err=>alert('invalid login'))
  }
  render() {
    return (
      <div>
        login
        <form onSubmit={this.onSubmit}>
          <input
          name="email"
          required
          value={this.state.email}
          onChange={this.onChange}
          type="text"/>
          <input
          name="password"
          required
          value={this.state.password}
          onChange={this.onChange}
          type="password"/>
          <input type="submit" value="login"/>
        </form>
      </div>
    );
  }
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(testform)
