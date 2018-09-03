const express = require('express');
const router = express.Router();
const axios = require('axios');
const parseString = require('xml2js').parseString;

router.get('/', async function(req, res) {
  const fetchNYTapi = await axios.get(
    'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=9b5181a0d74c4d5b9b52ecc26ccb38f1'
  );
  res.send({
    backendBooks: fetchNYTapi.data.results
  });
});

module.exports = router;

// app.get('/category',  (req, res) => {

//   axios.get(`https://newsapi.org/v2/${req.query.path}?country=${req.query.country}&category=${req.query.category}&apiKey=API_KEY`)

//  .then(response =>{
//      let articles = [];
//      response.data.articles.map((article) =>{
//          articles.push(article);
//      })
//  res.send({ articles});
// });
// })
