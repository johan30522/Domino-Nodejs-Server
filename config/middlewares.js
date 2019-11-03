
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
//permite obtener la configuracion que utiliza el domino desde el config.json
const config=require('./config');

app.use(cors({origin:global.gConfig.url_frontend}));//se agrega para que permita peticiones del servidor de angular.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use('/api', contactRoutes);

module.exports = app;
