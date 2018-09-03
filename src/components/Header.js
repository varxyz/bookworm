import React, { Component } from 'react';
import { parseString } from 'xml2js';
import { Input, Menu } from 'semantic-ui-react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, Link } from 'react-router-dom';
import { fetchBooks, toggleLoading } from '../actions';

import { Wrapper, Title, Button } from '../style/styled';

class Header extends Component {
  state = { searchTerm: '', activeItem: null, bookList2: [] };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  doSearch = debounce(() => {
    let self = this;
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search.xml?key=uLcNEgljUTXWGSw7eahPw&q=${
          this.state.searchTerm
        }`
      )
      .then(res =>
        parseString(res.data, function(err, res) {
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
    this.doSearch();
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu>
        <Menu.Item as={Link} to="/">
          <h2>bookworm</h2>
        </Menu.Item>
        <Menu.Menu className="searchInput">
          <Menu.Item>
            <Input
              onChange={this.onInputChage}
              size="big"
              icon="search"
              placeholder="Search..."
            />
          </Menu.Item>
        </Menu.Menu>
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
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books,
    currentBook: state.currentBook,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBooks, toggleLoading }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
