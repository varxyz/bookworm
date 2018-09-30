import React, { Component } from 'react';
import { compose } from 'redux';
import {Link} from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBooks, selectBook, toggleLoading } from '../actions';
import { Grid, Loader } from 'semantic-ui-react';

class Watchlist extends Component {
  state = { cBook: this.props.currentBook, loading: false, books: [] };
  constructor(props) {
    super(props);
  }
  renderLoader() {
    return <Loader active inline="centered" />;
  }
  renderContent() {
    if (this.props.users) {
      const userEntry = this.props.users.find(entry => {
        if (entry.email === this.props.auth.email) {
          return entry;
        }
        return false;
      });
      if(userEntry) {
        const watchlistArr = Object.keys(userEntry.watchlist).map(
          i => userEntry.watchlist[i]
        );
        return (
          <ul>
            {watchlistArr.map(i => (
              <Link
                to=
                {`/book/${i.gid}`}
                key=
                {i.gid}>
              <li
                className="booklist"
                key={i.gid}
                onClick={() => {
                  {/* this.setState({ cBook: book });
                  this.props.selectBook(book.best_book[0].id[0]['_']); */}
                }}
              >
                <img src={i.cover} />
              </li>
              </Link>
            ))}
          </ul>
        );
      }
      return <h3>You have not yet added a book to your watchlist :(</h3>
    }
  }

  render() {
    return this.props.users && !this.props.loading ? (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <ul>{this.renderContent()}</ul>
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
    loading: state.loading,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchBooks, selectBook, toggleLoading },
    dispatch
  );
}

export default compose(
  firestoreConnect([{ collection: 'users' }]),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Watchlist);
