const express = require('express');
const logger = require('morgan');
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

require("dotenv").config();

const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

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

//Routes:
//http://localhost/api/....
app.use("/api",require("./routes"));
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})