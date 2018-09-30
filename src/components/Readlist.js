import React, { Component } from 'react';
import { compose } from 'redux';
import {Link} from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBooks, selectBook, toggleLoading } from '../actions';
import { Grid } from 'semantic-ui-react';

class Readlist extends Component {
  state = { cBook: this.props.currentBook, loading: false, books: [] };
  constructor(props) {
    super(props);
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

        const readlistArr = Object.keys(userEntry.readlist).map(
          i => userEntry.readlist[i]
        );
        return (
          <ul>
            {readlistArr.map(i => (
              <Link
                to=
                {`/book/${i.gid}`}
                key=
                {i.gid}>
                <li
                  className="booklist"
                >
                  <img src={i.cover} />
                </li>
              </Link>
            ))}
          </ul>
        );
      }
      return <h3>You have not read any books yet :(</h3>
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
    ) : null;
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
)(Readlist);
