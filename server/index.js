const express = require('express');
const routes = require('./routes/index');
const bookRoutes = require('./routes/books');
const singleBookRoute = require('./routes/singleBookRoute');
const searchBook = require('./routes/searchBook');
const cors = require('cors')
const path = require('path');

const whitelist = ['http://0.0.0.0:8080/', 'http://0.0.0.0:8080/bookworm/', 'https://varxyz.github.io/bookworm/', 'http://localhost:8080']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
let app = express();
const PORT = process.env.PORT || 5000;
// static assets
app.use(express.static('dist'));

app.use(cors());
app.use('/', routes);
app.use('/api/books', bookRoutes);
app.use('/api/book/:id', singleBookRoute);
app.get('/book/:id', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
);
app.use('/api/books/:searchTerm', searchBook);

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});
