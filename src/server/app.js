const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

/**
 * Loadind the router
 */
const file = require('./api/FileApi.router');

/**
 * Initializing the express server
 */
const app = express();


// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files
app.use(express.static('dist'));

// Add headers to enable CORS to support cross domain communication.
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//Using the API
app.use('/api', file);

//LISTENING THE PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
