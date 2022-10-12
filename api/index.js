const express = require('express');
const logger = require('morgan');
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

// import individual service aws
var S3 = require('aws-sdk/clients/s3');

const cors = require('cors');
const dotenv = require ("dotenv");

dotenv.config()




const app = express();

app.use(cors({
    origin:"*",
    method:['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders:'Content-type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/temp/',
    debug: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
const productsRoute = require('./routes/products');

//USE ROUTES
app.use('/products', productsRoute);


module.exports = app;