const key = require('../key.json');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { use } = require('../server');
const User = mongoose.model('User');

exports.register = (req, res) => {
    if (!(req.body.email && req.body.password && req.body.name && req.body.yearOfBirth && req.body.address))
        return res.status(400).json({
            message: "Sign up failed"
        });
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (!user || !user.password) {
            let newUser = new User();
            newUser.email = req.body.email;
            newUser.password = bcrypt.hashSync(req.body.password, 10);
            newUser.name = req.body.name;
            newUser.yearOfBirth = req.body.yearOfBirth;
            newUser.address = req.body.address;
            newUser.save((err, user) => {
                if (err) {
                    return res.status(400).send({
                        message: err
                    });
                } else {
                    user.password = undefined;
                    return res.json(user);
                }
            });
        } else {
            res.status(401).json({ message: 'Sign up failed. Email address already exists' });
        }
    });
};

exports.sign_in = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else {
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
                return res.json({ token: jwt.sign({ _id: user._id }, key.private) });
            }
        }
    });
};

exports.loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

exports.profile = (req, res, next) => {
    User.findOne({
        _id: req._id
    }, (err, user) => {
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else {
            return res.json({
                name: user.name,
                email: user.email,
                avatar: user.avatar
            })

        }
    });
};