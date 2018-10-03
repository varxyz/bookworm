import { Grid, Icon, Image, Rating, Button } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

class BookDetails extends Component {
  state = { added: false };

  checkIfAddedInWatchlist(bookToBeChecked) {
    if (this.props.auth.uid && this.props.usersData) {
      return Object.keys(this.props.usersData).find(entry => {
        return   this.props.usersData[entry].watchlist[bookToBeChecked.title[0]] && this.props.usersData[entry].watchlist[bookToBeChecked.title[0]].gid === bookToBeChecked.id[0]
      });
    }
    return null;
  }

  checkIfMarkedAsRead(bookToBeChecked) {
    if (this.props.auth.uid && this.props.usersData) {
      return Object.keys(this.props.usersData).find(entry => {
        return   this.props.usersData[entry].readlist[bookToBeChecked.title[0]] && this.props.usersData[entry].readlist[bookToBeChecked.title[0]].gid === bookToBeChecked.id[0]
      });
    }
    return null;
  }

  addBooktoWatchlist(book) {
    this.props.users.map(i => {
      if (i.email === this.props.auth.email) {
        var m = i.watchlist;
        this.props.firestore.update(
          { collection: 'users', doc: i.id },
          {
            watchlist: {
              ...m,
              [book.title[0]]: { gid: book.id[0], cover: book.image_url[0], added: !this.state.added }
            }
          }
        );
      }
    });
  }

  deleteBookFromReadlist(book) {
    Object.keys(this.props.usersData).map(i => {
      if (this.props.usersData[i].email === this.props.auth.email) {
        var readlist = this.props.usersData[i].readlist;
        const newList = Object.keys(readlist).reduce((acc, curr) => {
          if (curr !== book.title[0]) {
            acc[curr] = readlist[curr];
          }
          return acc;
        }, {});
        this.props.firestore.update(
          { collection: 'users', doc: i },
          {
            readlist: newList
          }
        );
      }
    })
  }

  deleteBookFromWatchlist(book) {
    Object.keys(this.props.usersData).map(i => {
      if (this.props.usersData[i].email === this.props.auth.email) {
        var watchlist = this.props.usersData[i].watchlist;
        const newList = Object.keys(watchlist).reduce((acc, curr) => {
          if (curr !== book.title[0]) {
            acc[curr] = watchlist[curr];
          }
          return acc;
        }, {});
        this.props.firestore.update(
          { collection: 'users', doc: i },
          {
            watchlist: newList
          }
        );
      }
    })
  }

  markAsRead(book) {
    this.props.users.map(i => {
      if (i.email === this.props.auth.email) {
        var m = i.readlist;
        this.props.firestore.update(
          { collection: 'users', doc: i.id },
          {
            email: i.email,
            watchlist: i.watchlist,
            readlist: {
              ...m,
              [book.title[0]]: { gid: book.id[0], cover: book.image_url[0], added: !this.state.added }
            }
          }
        );
      }
    });
  }

  renderWatchlistButton(theBook) {
    return this.checkIfAddedInWatchlist(theBook) ? (
      <Button
        disabled={this.props.auth.uid ? false : true}
        data-tooltip="Remove this book from watchlist"
        onClick={() => this.deleteBookFromWatchlist(theBook)}
        icon
        active
      >
        <Icon name="bookmark" /> Remove
      </Button>
    ) : (
      <Button
        disabled={this.props.auth.uid ? false : true}
        data-tooltip="Add this book to watchlist"
        onClick={() => this.addBooktoWatchlist(theBook)}
        icon
      >
        <Icon name="bookmark outline" /> Watchlist
      </Button>
    );
  }
  renderReadButton(theBook) {
    return this.checkIfMarkedAsRead(theBook) ? (
      <Button
        disabled={this.props.auth.uid ? false : true}
        data-tooltip="You already read this book"
        data-position="bottom center"
        onClick={() => this.deleteBookFromReadlist(theBook)}
        active
        icon
      >
        <Icon name="check" /> Read
      </Button>
    ) : (
      <Button
        disabled={this.props.auth.uid ? false : true}
        onClick={() => this.markAsRead(theBook)}
      >
        Mark as read
      </Button>
    );
  }

  renderbook() {
    const theBook = this.props.book;
    return (
      <Grid>
        <Grid.Row />
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={5} className="ibook">
            <Image src={theBook.image_url[0]} />
          </Grid.Column>
          <Grid.Column width={9}>
            <h3>{theBook.title[0]}</h3>
            <p>by {theBook.authors[0].author[0].name[0]}</p>
            <Rating
              icon="star"
              rating={Math.round(+theBook.average_rating[0])}
              maxRating={5}
              disabled
            />{' '}
            <span>{theBook.ratings_count[0]} ratings</span> &#183;{' '}
            <span>{theBook.text_reviews_count[0]} reviews</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={5}>
            <Button.Group basic vertical>
              {this.renderWatchlistButton(theBook)}
              {this.renderReadButton(theBook)}
            </Button.Group>
          </Grid.Column>
          <Grid.Column width={10}>
            <div
              dangerouslySetInnerHTML={{
                __html: theBook.description[0].slice(
                  0,
                  theBook.description[0].indexOf('.<') + 1
                )
              }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={15}>
            <div id="goodreads-widget">
              <div id="gr_header">
                <h1>
                  <a
                    rel="nofollow"
                    href={`https://www.goodreads.com/book/show/${
                      theBook.id[0]
                    }`}
                  >
                    Goodreads reviews
                  </a>
                </h1>
              </div>
              <iframe
                id="the_iframe"
                src={`https://www.goodreads.com/api/reviews_widget_iframe?did=40043&format=html&header_text=Goodreads+reviews+for+${
                  theBook.title[0]
                }&isbn=${
                  theBook.isbn13[0]
                }&links=660&review_back=fff&stars=000&text=000`}
                width="565"
                height="400"
                frameBorder="0"
              />
              <div id="gr_footer">
                <a
                  className="gr_branding"
                  target="_blank"
                  rel="nofollow"
                  href="https://www.goodreads.com/book/show/2956.The_Adventures_of_Huckleberry_Finn?utm_medium=api&utm_source=reviews_widget"
                />
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    return this.renderbook()
  }
}

export default compose(
  firebaseConnect(),
  firestoreConnect([
    { collection: 'users' }
  ]),
  connect((state, props) => {
    return {
      auth: state.firebase.auth,
      users: state.firestore.ordered.users,
      usersData: state.firestore.data.users
    };
  })
)(BookDetails);
