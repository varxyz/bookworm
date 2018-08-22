import React, { Component } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BookDetails from './BookDetails';

import {fetchBooks, selectBook} from '../actions';
import { Grid, Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

// const myCredentials = {
//   key: 'uLcNEgljUTXWGSw7eahPw',
//   secret: 'QOz6xMXwwjhX5jNpVTEo59xHbAonlxzmvhouO8e0'
// };

class MainPage extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }
  renderLoader() {
    return <Loader active inline="centered" />;
  }
  renderContent() {
    return this.props.books.map(book => {
      return (
        <li
          className="booklist"
          key={book.best_book[0].title[0]}
          onClick={() => this.props.selectBook(book.best_book[0].id[0]['_'])}
        >
          <img src={book.best_book[0].image_url[0]} />
        </li>
      );
    });
  }

  render() {
    return this.props.books.length ? (
      <Grid divided>
        <Grid.Row columns={2}>
          <Grid.Column>
            <ul>{this.renderContent()}</ul>
          </Grid.Column>
          <Grid.Column>
            <BookDetails default={this.props.books[0].best_book[0].title[0]} book={this.props.currentBook} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ) : (
      this.renderLoader()
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.books,
    currentBook: state.currentBook
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBooks, selectBook }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
