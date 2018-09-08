import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BookDetails from './BookDetails';
import axios from 'axios';
import { fetchBooks, selectBook, toggleLoading } from '../actions';
import { Grid, Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

// const myCredentials = {
//   key: 'uLcNEgljUTXWGSw7eahPw',
//   secret: 'QOz6xMXwwjhX5jNpVTEo59xHbAonlxzmvhouO8e0'
// };

class MainPage extends Component {
  state = { cBook: this.props.currentBook, loading: false, books: [] };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchBooks();
    // axios.get('http://localhost:5000/api/books').then(res=>{console.log(res); return this.setState({books: res.data.backendBooks})})
  }

  renderLoader() {
    return <Loader active inline="centered" />;
  }
  renderContent() {
    return this.props.books.map(book => {
      return (
        <li
          className="booklist"
          key={book.best_book[0].id[0]['_']}
          onClick={() => {
            this.setState({ cBook: book });
            this.props.selectBook(book.best_book[0].id[0]['_']);
          }}
        >
          <img src={book.best_book[0].image_url[0]} />
        </li>
      );
    });
  }

  render() {
    return this.props.books[0] ? (
      <Grid divided>
        <Grid.Row columns={2}>
          <Grid.Column>
            <ul>{this.renderContent()}</ul>
          </Grid.Column>
          <Grid.Column>
            {!this.state.cBook ? (
              <BookDetails
                book={this.props.currentBook}
                addWatchList={this.addBookToWatchList}
              />
            ) : this.props.currentBook &&
            this.state.cBook &&
            this.props.currentBook.title[0]  ? (
              <BookDetails
                book={this.props.currentBook}
                addWatchList={this.addBookToWatchList}
              />
            ) : (
              this.renderLoader()
            )}
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
    currentBook: state.currentBook,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchBooks, selectBook, toggleLoading },
    dispatch
  );
}

export default compose(
  firestoreConnect([{ collection: 'watchlist' }, { collection: 'books' }]),
  connect(mapStateToProps, mapDispatchToProps)
)(MainPage);
