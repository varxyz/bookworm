import React, { Component } from 'react';
import { parseString } from 'xml2js';
import { Input, Menu } from 'semantic-ui-react';
import debounce from 'lodash.debounce';
import axios from 'axios';

import { Wrapper, Title, Button } from '../style/styled';

class Header extends Component {
  state = {searchTerm: '', activeItem: null};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  doSearch = debounce(() => {
    axios
    .get(
      `https://www.goodreads.com/search.xml?key=uLcNEgljUTXWGSw7eahPw&q=${
        this.state.searchTerm
      }`
    )
    .then(res =>
      parseString(res.data, function(err, res) {
        if (res.GoodreadsResponse.search[0].results[0].work) {
          self.setState({
            bookList2: self.state.bookList2.concat(
              [],
              res.GoodreadsResponse.search[0].results[0].work[0] ||
                null
            )
          });
        }
      })
    );
  }, 300)

  onInputChage = (e) => {
    this.setState({searchTerm: e.target.value})
    this.doSearch()
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Menu>
        <Menu.Item
          name="submit"
          onClick={this.handleItemClick}
        >
          <h2>bookworm</h2>
        </Menu.Item>
        <Menu.Menu className="searchInput">
            <Menu.Item>
              <Input  onChange={this.onInputChage} size='big' icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item
            name="signup"
            active={activeItem === 'signup'}
            onClick={this.handleItemClick}
          >
            Sign Up
          </Menu.Item>

          <Menu.Item
            name="help"
            active={activeItem === 'help'}
            onClick={this.handleItemClick}
          >
            Help
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
