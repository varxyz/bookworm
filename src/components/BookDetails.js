import { Grid, Icon, Image, Rating, Button } from 'semantic-ui-react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class BookDetails extends Component {
  state = { added: false };

  checkIfAddedInWatchlist(bookToBeChecked) {
    // console.log(this.props)
    if(this.props.auth.uid && this.props.watchlistFstore) {

      return this.props.watchlistFstore.find(entry => {
        return entry && entry.gid === bookToBeChecked.id[0];
      });
    } return null
  }
  checkIfMarkedAsRead(bookToBeChecked) {
    if(this.props.auth.uid && this.props.readlist) {

    return this.props.readlist.find(entry => {
      if (entry && entry.gid === bookToBeChecked.id[0]) {
        return entry.added || false;
      }
    });
  } return null
  }

  addBooktoWatchlist(book) {
    this.props.firestore.add({ collection: 'watchlist' }, { gid: book.id[0] });
  }

  deleteBookFromWatchlist(book) {
    return this.props.watchlistFstore.map(item => {
      if (item.gid === book.id[0]) {
        this.props.firestore.delete({ collection: 'watchlist', doc: item.id });
      }
    });
  }

  markAsRead(book) {
    this.props.firestore.add(
      { collection: 'readlist' },
      { gid: book.id[0], added: !this.state.added }
    );
    // return this.props.readlist.find(entry => {
    //     this.setState({ added: !this.state.added });
    //     this.props.firestore.add({ collection: 'readlist'}, { gid: book.id[0], added: !this.state.added });
    // });
  }

  uncheckRead(book) {
    return this.props.readlist.map(item => {
      if (item.gid === book.id[0] && item.added) {
        this.props.firestore.delete({ collection: 'readlist', doc: item.id });
      }
    });
  }

  renderWatchlistButton(theBook) {
    // console.log(this.props.auth.uid)
    return this.checkIfAddedInWatchlist(theBook) ? (
      <Button disabled={this.props.auth.uid ? false : true} data-tooltip="Remove this book from watchlist" onClick={() => this.deleteBookFromWatchlist(theBook)} icon>
        <Icon name="bookmark" /> Remove
      </Button>
    ) : (
      <Button disabled={this.props.auth.uid ? false : true} data-tooltip="Add this book to watchlist" onClick={() => this.addBooktoWatchlist(theBook)} icon>
        <Icon name="bookmark outline" /> Watchlist
      </Button>
    );
  }
  renderReadButton(theBook) {
    return this.checkIfMarkedAsRead(theBook) ? (
      <Button disabled={this.props.auth.uid ? false : true} data-tooltip="You alredy read this book" data-position="bottom center" onClick={() => this.uncheckRead(theBook)} active icon>
        <Icon name="check" /> Read
      </Button>
    ) : (
      <Button disabled={this.props.auth.uid ? false : true} onClick={() => this.markAsRead(theBook)}>Mark as read</Button>
    );
  }

  renderbook() {
    const theBook = this.props.book;
    return (
      <Grid>
        <Grid.Row />
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={5}>
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
    return this.props.book ? (
      this.renderbook()
    ) : (
      <h1 style={{ marginTop: '.3em' }}>
        &larr; Please select a book to explore it
      </h1>
    );
  }
}

export default compose(
  firestoreConnect([{ collection: 'watchlist' }, { collection: 'readlist' }]),
  connect((state, props) => ({
    watchlistFstore: state.firestore.ordered.watchlist,
    readlist: state.firestore.ordered.readlist,
    auth: state.firebase.auth
  }))
)(BookDetails);
