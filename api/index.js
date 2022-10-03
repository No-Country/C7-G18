const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config()

//APP
const app = express();
app.use(cors({
    origin:"*",
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders:'Content-type, Authorization, Origin, X-Requested-With, Accept'
}))

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes

//Use Routes

module.exports = app;