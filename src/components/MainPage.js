import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookDetails from './BookDetails';
import { fetchBooks, selectBook, toggleLoading } from '../actions';
import { Grid, Loader } from 'semantic-ui-react';

class MainPage extends Component {
  state = {
    cBook: this.props.currentBook,
    loading: false,
    books: []
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    if (id) {
      this.setState({ loading: true });
      axios
        .get(`http://bkworm.herokuapp.com/api/book/${id}`)
        .then(({ data: { book } }) => {
          this.setState({ cBook: book });
          this.props.selectBook(book);
          this.setState({ loading: false });
        });
    }
    if (!this.props.books.length) {
      axios.get('http://bkworm.herokuapp.com/api/books').then(res => {
        this.setState({ books: res.data.backendBooks });
        this.props.fetchBooks(res.data.backendBooks);
      });
    }
  }

  renderLoader() {
    return <Loader active inline="centered" />;
  }
  renderContent() {
    const books = this.props.books.length ? this.props.books : this.state.books;

    return books.map(book => {
      return (
        <Link
          to={`/book/${book.best_book[0].id[0]['_']}`}
          key={book.best_book[0].id[0]['_']}
        >
          <li
            className="booklist"
            onClick={e => {
              this.setState({ loading: true });
              axios
                .get(
                  `http://bkworm.herokuapp.com/api/book/${
                    book.best_book[0].id[0]['_']
                  }`
                )
                .then(({ data: { book } }) => {
                  this.setState({ cBook: book });
                  this.props.selectBook(book);
                  this.setState({ loading: false });
                });
            }}
          >
            <img src={book.best_book[0].image_url[0]} />
          </li>
        </Link>
      );
    });
  }

  render() {
    return this.state.books[0] ||
      (this.props.books[0] && !this.props.loading) ? (
      <Grid divided>
        <Grid.Row columns={2}>
          <Grid.Column>
            <ul>{this.renderContent()}</ul>
          </Grid.Column>
          <Grid.Column>
            {this.state.cBook && !this.state.loading ? (
              <BookDetails
                book={this.props.currentBook}
                addWatchList={this.addBookToWatchList}
              />
            ) : this.state.loading ? (
              this.renderLoader()
            ) : (
              <h1
                style={{
                  marginTop: '.3em'
                }}
              >
                &larr; Please select a book to explore
              </h1>
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
    {
      fetchBooks,
      selectBook,
      toggleLoading
    },
    dispatch
  );
}

export default compose(
  firestoreConnect([
    {
      collection: 'users'
    }
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MainPage);
