const key = require('./key.json');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/biove';
const db = mongoose.connection;
require('./models/users.model');
require('./models/communities.model');
const express = require('express');
const app = express();
const port = 2000;
const jwt = require("jsonwebtoken");
const cors = require('cors')
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cors())
app.listen(port, () => {
    console.log('server is running')
})

app.use((req, res, next) => {
    if (req.headers && req.headers.authorization) {
        jwt.verify(req.headers.authorization, key.private, (err, decode) => {
            req._id = decode._id;
            if (err) req._id = undefined;
            next();
        });
    } else {
        req._id = undefined;
        next();
    }
}, (req, res, next) => {
    next()
});

var homeRoute = require('./routes/homeRoute');
var plantingRoute = require('./routes/plantingRoute')
homeRoute(app)
plantingRoute(app)
app.use((req, res) => {
    res.status(404).json({ message: req.originalUrl + ' not found' })
});
module.exports = app;