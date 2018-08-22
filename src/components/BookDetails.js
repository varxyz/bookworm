import React, { Component } from 'react';
import { Grid, Segment, Image, Rating } from 'semantic-ui-react'

class BookDetails extends Component {


  renderbook() {
    const theBook = this.props.book;
    return (
      <Grid>
      <Grid.Row/>
        <Grid.Row>
          <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column width={4}>
            <Image src={theBook.image_url[0]} />
          </Grid.Column>
          <Grid.Column width={10}>
            <h3>{theBook.title[0]}</h3>
            <p>by {theBook.authors[0].author[0].name[0]}</p>
            <Rating icon='star' rating={Math.round(+theBook.average_rating[0])} maxRating={5} disabled/>
            {' '}
            <span>{theBook.ratings_count[0]} ratings</span>
            {' '}
             &#183; <span>{theBook.text_reviews_count[0]}{' '}reviews</span>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
        <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column width={4}>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
          </Grid.Column>
          <Grid.Column width={10}>
          <div dangerouslySetInnerHTML={{ __html: theBook.description[0].slice(0, theBook.description[0].indexOf('.<') +1 ) }} />
          {/* {theBook.reviews_widget[0]} */}
          <div id="goodreads-widget">
            <div id="gr_header"><h1><a rel="nofollow" href={`https://www.goodreads.com/book/show/${theBook.id[0]}`}>Goodreads reviews for {theBook.title[0]}</a></h1></div>
            <iframe id="the_iframe" src={`https://www.goodreads.com/api/reviews_widget_iframe?did=40043&format=html&header_text=Goodreads+reviews+for+${theBook.title[0]}&isbn=${theBook.isbn13[0]}&links=660&review_back=fff&stars=000&text=000`} width="565" height="400" frameBorder="0"></iframe>
            <div id="gr_footer">
              <a className="gr_branding" target="_blank" rel="nofollow" href="https://www.goodreads.com/book/show/2956.The_Adventures_of_Huckleberry_Finn?utm_medium=api&utm_source=reviews_widget">Reviews from Goodreads.com</a>
            </div>
          </div>
          <div id="goodreads-widget"></div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  render() {
    console.log('rating updated', this.props.book);

    return (
        this.props.book
          ? this.renderbook()
          : this.props.default

    );
  }
}

export default BookDetails;
