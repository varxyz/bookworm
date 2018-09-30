const express = require('express');
const router = express.Router();
const axios = require('axios');
const parseString = require('xml2js').parseString;

router.get('/', function(req, res) {

  let books;
  let booki = [];
  return axios.get(
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
          `https://www.goodreads.com/search.xml?key=uLcNEgljUTXWGSw7eahPw&q=${newBookTitle}`
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
    })
    .then(ress => {
      return res.send({
        backendBooks: booki
      })}
    )
    .catch((err) => console.log('loooooo------==='));
  });
});

module.exports = router;
