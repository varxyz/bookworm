import React, { Component } from 'react';
import { parseString } from 'xml2js';
import { Input, Menu } from 'semantic-ui-react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { NavLink, Link } from 'react-router-dom';
import { fetchBooks, toggleLoading } from '../actions';

class Header extends Component {
  state = { searchTerm: '', activeItem: null, bookList2: [], isLoading: false };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleSignout = e => {
    e.preventDefault();
    this.handleItemClick(e, { name });
    this.props.firebase.logout();
  };
  doSearch = debounce(() => {
    let self = this;
    self.setState({ isLoading: false });
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search.xml?key=uLcNEgljUTXWGSw7eahPw&q=${
          this.state.searchTerm
        }`
      )
      .then(res =>
        parseString(res.data, function(err, res) {
          // self.setState({ isLoading: false });

          if (res.GoodreadsResponse.search[0].results[0].work) {
            self.setState({
              bookList2: self.state.bookList2.concat(
                [],
                res.GoodreadsResponse.search[0].results[0].work
              )
            });
            self.props.fetchBooks(
              res.GoodreadsResponse.search[0].results[0].work
            );
          }
        })
      )
      .then(() => this.props.toggleLoading(false));
  }, 300);

  onInputChage = e => {
    this.props.toggleLoading(true);

    this.setState({ searchTerm: e.target.value });
    this.setState({ isLoading: true });
    this.doSearch();
    // this.setState({ isLoading: false });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu>
        <Menu.Item
          active={activeItem === 'null'}
          onClick={this.handleItemClick}
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
        {this.props.auth.uid ? (
          <Menu.Menu position="right">
            <Menu.Item
              as={NavLink}
              to="/watchlist"
              name="watchlist"
              active={activeItem === 'watchlist'}
              onClick={this.handleItemClick}
            >
              Watchlist
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to="/mybooks"
              name="mybooks"
              active={activeItem === 'mybooks'}
              onClick={this.handleItemClick}
            >
              My Books
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to="/login"
              name="login"
              active={activeItem === 'logout'}
              onClick={this.handleSignout}
            >
              Logout
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item
              as={NavLink}
              to="/login"
              name="login"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            >
              Log In
            </Menu.Item>

            <Menu.Item
              as={NavLink}
              to="/signup"
              name="signup"
              name="signup"
              active={activeItem === 'signup'}
              onClick={this.handleItemClick}
            >
              Sign Up
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books,
    currentBook: state.currentBook,
    loading: state.loading,
    auth: state.firebase.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBooks, toggleLoading }, dispatch);
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
