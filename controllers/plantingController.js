const mongoose = require('mongoose');
const Community = mongoose.model('Community');
const User = mongoose.model('User');
exports.registerCommunity = (req, res) => {
    User.findOne({
        _id: req._id
    }, (err, user) => {
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else {
            let newCommunity = new Community(req.body);
            newCommunity.userID.push(user._id)
            newCommunity.created = new Date();
            newCommunity.email = user.email;
            newCommunity.save((err,community)=>{
                if (err) {
                    return res.status(400).send({
                        message: err
                    });
                } else {
                    return res.json(newCommunity);
                }
            })
        }
    });
}