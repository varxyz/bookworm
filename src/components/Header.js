import React, { Component } from 'react';
import { parseString } from 'xml2js';
import { Input, Menu } from 'semantic-ui-react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { firebaseConnect, firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { NavLink, Link } from 'react-router-dom';
import { fetchBooks, toggleLoading } from '../actions';

class Header extends Component {
  state = { searchTerm: '', bookList2: [], isLoading: false };
  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.books !== this.props.books && prevProps.books.length === 10) {
      this.setState({bookList2: this.props.books})
    }
  }
  handleSignout = e => {
    e.preventDefault();
    this.props.firebase.logout();
  };
  doSearch = debounce(() => {
    let self = this;
    self.setState({ isLoading: false });
    axios
      .get(
        `http://bkworm.herokuapp.com/api/books/${this.state.searchTerm}`
      )
      .then(res => {
            self.props.fetchBooks(
              res.data.searchRes
            );
      })
      .then(() => this.props.toggleLoading(false));
  }, 500);

  onInputChage = e => {
    if(e.target.value) {

      this.setState({ searchTerm: e.target.value });
      this.setState({ isLoading: true });
      this.props.toggleLoading(true);

      this.doSearch();
    }
    this.props.fetchBooks(this.state.bookList2)
    // this.setState({ isLoading: false });
  };

  render() {
    const { activeItem } = this.state;
    return  (
      <Menu>
        <Menu.Item
          active={activeItem === 'null'}
          as={Link}
          to="/"
        >
          <h2>bookworm</h2>
        </Menu.Item>
        <Menu.Menu className="searchInput">
          <Menu.Item>
            <Input
              onChange={this.onInputChage}
              size="big"
              icon="search"
              placeholder="Search..."
              loading={this.state.isLoading}
            />
          </Menu.Item>
        </Menu.Menu>
        {this.props.auth.uid  ? (
          <Menu.Menu position="right">
            <Menu.Item
              as={NavLink}
              to="/watchlist"
              activeClassName="selected"
            >
              Watchlist
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to="/mybooks"
              activeClassName="selected"

            >
              My Books
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to="/login"
              onClick={this.handleSignout}
            >
              Logout
            </Menu.Item>
          </Menu.Menu>
        ) : (
          this.props.auth.isLoaded ?
          (<Menu.Menu position="right">
            <Menu.Item
              as={NavLink}
              to="/login"
            >
              Log In
            </Menu.Item>

            <Menu.Item
              as={NavLink}
              to="/signup"
              activeClassName="selected"
            >
              Sign Up
            </Menu.Item>
          </Menu.Menu>) : null
        )}
      </Menu>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books,
    currentBook: state.currentBook,
    loading: state.loading,
    auth: state.firebase.auth,
    users: state.firestore.ordered.users
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBooks, toggleLoading }, dispatch);
}

export default compose(
  firebaseConnect(),
  firestoreConnect(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Header);
