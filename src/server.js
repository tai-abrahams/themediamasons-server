const express = require('express');

require('dotenv').config();

const port = process.env.PORT || 8080;

const mongoose = require('mongoose');

const helmet = require('helmet');

const morgan = require('morgan');

const cors = require('cors');

const router = require('./api/logRoutes');

const middleware = require('./middleware');

const db = mongoose.connection;

const app = express();

// eslint-disable-next-line no-unused-expressions

/*
mongoose.connect('mongodb+srv://process.env.MONGODB_USER:process.env.MONGODB_PASS@list.ix1mg.mongodb.net/forms?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((e) => {
  // eslint-disable-next-line no-console
    console.log('Initial Connection Error:', e.message);
  }).then(console.log('connected'));
*/

app.use(morgan('common')); // simplifies requests
app.use(helmet()); // security
app.use(cors({
  origin: 3000,
}));
app.use(express.json());

/*
db.on('error', () => {
  // eslint-disable-next-line no-console
  console.error.bind(console, 'connection error');
  // console.log('Connection error: ', err);
});
*/

app.get('/', (req, res) => {
  res.json(
    { message: 'Hello Worlds' },
  );
});

app.use('/log', router);

app.use(middleware.error404);
app.use(middleware.errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port: ', port);
});
