const express = require('express');
const router = express.Router();
const axios = require('axios');
const parseString = require('xml2js').parseString;

router.get('/', function(req, resp) {
  axios.get(`https://www.goodreads.com/book/show/${req.baseUrl.slice(req.baseUrl.indexOf('k')+2)}.xml?key=uLcNEgljUTXWGSw7eahPw`)
      .then(({data}) => {
        parseString(data, function(err, res) {
          return resp.send({
            book: res.GoodreadsResponse.book[0]
          })
        })
      })
});

module.exports = router;
