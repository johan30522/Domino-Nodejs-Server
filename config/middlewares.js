
/**
 * @file 
 * Midleware principal.
 */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const contactRoutes = require('../api/contact/routes');
const cors = require('cors');

// environment variables
process.env.NODE_ENV = 'development';

app.use(cors({origin:'http://localhost:4200'}));//se agrega para que permita peticiones del servidor de desarrollo de angular en el 4200.


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use('/api', contactRoutes);


module.exports = app;
