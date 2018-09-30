const express = require('express');
const router = express.Router();
const axios = require('axios');
const parseString = require('xml2js').parseString;

router.get('/', function(req, resp) {
  axios.get(`https://www.goodreads.com/search.xml?key=uLcNEgljUTXWGSw7eahPw&q=${req.baseUrl.slice(req.baseUrl.indexOf('s')+2)}`)
      .then(({data}) => {
        parseString(data, function(err, res) {
          return resp.send({
            searchRes: res.GoodreadsResponse.search[0].results[0].work
          })
        })
      })
});

module.exports = router;
