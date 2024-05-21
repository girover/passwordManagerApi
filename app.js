const express = require('express');
const partials = require('express-partials');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dataBag = require('./middlewares/dataBag');
const cors = require('./middlewares/cors');
const invalidPathHandler = require('./middlewares/invalidPathHandler');
const errorHandler = require('./middlewares/errorHandler');
const apiRouter = require('./routers/api');

const app = express();
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.urlencoded({ extended: false }));   // parse application/x-www-form-urlencoded
app.use(bodyParser.json());     // parse application/json

// set the static files directory
app.use(express.static(path.join(__dirname, 'web/public')));

app.use(morgan('dev'));     // log all requests to the console.

app.use(cors);          // add the CORS configuration to the request pipeline.

app.use(dataBag);     // add the dataBag middleware to the request pipeline.

// Endpoints Routing
app.use('/api', apiRouter);

// ...............................................

app.use(invalidPathHandler); // add the invalid path handler to the request pipeline.
app.use(errorHandler); // add the error handler to the request pipeline.

module.exports = app;