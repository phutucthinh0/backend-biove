const admin = require('firebase-admin');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const key = require('../key.json');
const jwt = require('jsonwebtoken');
var serviceAccount = require("../firebase_admin_key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
exports.sign_in = (req, res) => {
    // console.log(req.body.idtoken)    
    if (!(req.body.idtoken))
        return res.status(400).json({
            message: "Sign up failed"
        });
    admin.auth()
        .verifyIdToken(req.body.idtoken)
        .then((decodedToken) => {
            admin.auth()
                .getUser(decodedToken.uid)
                .then((userRecord) => {
                    if (!userRecord.email) {
                        return res.json({ message: 'Error email not found' });
                    }
                    User.findOne({
                        email: userRecord.email
                    }, (err, user) => {
                        if (!user) {
                            // Thực hiện đăng kí mới
                            let newUser = new User();
                            newUser.email = userRecord.email;
                            newUser.name = userRecord.displayName;
                            if (userRecord.photoURL) newUser.avatar = userRecord.photoURL;
                            newUser.save((err, user_new) => {
                                if (err) {
                                    return res.status(400).json({
                                        message: err
                                    });
                                }
                                return res.json({ token: jwt.sign({ _id: user_new._id }, key.private) });
                            });
                        }else{
                            return res.json({ token: jwt.sign({ _id: user._id }, key.private) });
                        }
                        
                    });
                })
                .catch((error) => {
                    res.status(401).json({ message: 'Error fetching user data: ' + error });
                });
        })
        .catch((error) => {
            res.status(400).json({
                message: error
            });
        });
}