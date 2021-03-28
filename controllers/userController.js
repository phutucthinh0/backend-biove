const key = require('../key.json');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

exports.register = (req, res) => {
    let newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
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
};

exports.sign_in = (req, res) => {
    User.findOne({
        email: req.body.email
    },(err,user)=>{
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else{
            if (!bcrypt.compareSync(req.body.password,user.password)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
                return res.json({ token: jwt.sign({_id:user._id}, key.private) });
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