const key = require('./key.json');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/biove';
const db = mongoose.connection;
const User = require('./models/users.model');
const express = require('express');
const app = express();
const port = 2000;
const jwt = require("jsonwebtoken");
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
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
homeRoute(app)
app.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});
module.exports = app;