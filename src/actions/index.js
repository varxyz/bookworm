import axios from 'axios';
const FETCH_BOOKS = 'FETCH_BOOKS';
import { parseString } from 'xml2js';
const corsLink = 'https://cors-anywhere.herokuapp.com/'

export function toggleLoading(bool) {
  return {
    type: 'TOGGLE_LOADING',
    payload: bool
  }
}

export function selectBook(id) {
  return dispatch => {
    let book;
    axios.get(`${corsLink}https://www.goodreads.com/book/show/${id}.xml?key=uLcNEgljUTXWGSw7eahPw`)
      .then(({data}) => {
        parseString(data, function(err, res) {
          dispatch({ type: 'SELECT_BOOK', payload: res.GoodreadsResponse.book[0] });
        })
      })
  }
}

export function addToWatchList(book) {
  return {
    type: 'ADD_TO_WATCHLIST',
    payload: book
  }
}

export function fetchBooks(searchResultBooks) {
  return dispatch => {
    let books;
    let booki = [];
    return searchResultBooks
    ? dispatch({ type: 'FETCH_BOOKS', payload: searchResultBooks })
    :  axios
      .get(
        'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=9b5181a0d74c4d5b9b52ecc26ccb38f1'
      )
      .then(({ data }) => {
        books = data.results;
      })
      .then(() => {
        Promise.all(
          books.map((book) => {
            let newBookTitle = book.title.replace(/#|_/g, '');
            return axios.get(
              `${corsLink}https://www.goodreads.com/search.xml?key=uLcNEgljUTXWGSw7eahPw&q=${newBookTitle}`
            );
          })
        ).then(res => {
          res.forEach(el => {
            parseString(el.data, function(err, res) {
              const resBook = res.GoodreadsResponse.search[0].results[0].work;

              if (
                resBook &&
                resBook[0].best_book[0].image_url[0].indexOf('nophoto') === -1
              ) {
                booki = booki.concat(
                  [],
                  res.GoodreadsResponse.search[0].results[0].work[0] || null
                );
              }
            });
          });
          dispatch({ type: 'FETCH_BOOKS', payload: booki.slice(0,9) });
        });
      });
  };
}
