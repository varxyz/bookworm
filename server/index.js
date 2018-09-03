const express = require('express');
const routes = require('./routes/index');
const bookRoutes = require('./routes/books');
const cors = require('cors')

const whitelist = ['http://0.0.0.0:8080/', 'https://varxyz.github.io/bookworm/', 'http://localhost:8080']
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
app.use(cors(corsOptions));
app.use('/', routes);
app.use('/api/books', cors(corsOptions), bookRoutes);

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});
