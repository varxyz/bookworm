const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');


// main route
app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname, './dist/index.html'))
);
// const myCredentials = {   key: 'uLcNEgljUTXWGSw7eahPw',   secret:
// 'QOz6xMXwwjhX5jNpVTEo59xHbAonlxzmvhouO8e0' };

router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
});

module.exports = router;
