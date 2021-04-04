const mongoose = require('mongoose');
const Community = mongoose.model('Community');
const User = mongoose.model('User');
const Campaign = mongoose.model('Campaign');
exports.registerCommunity = (req, res) => {
    User.findOne({
        _id: req._id
    }, (err, user) => {
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        let newCommunity = new Community(req.body);
        newCommunity.userID.push(user._id)
        newCommunity.created = new Date();
        newCommunity.email = user.email;
        newCommunity.save((err, community) => {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                return res.json(newCommunity);
            }
        })
    });
}
exports.registerCampaign = (req, res) => {
    if (req._role != "admin") return res.status(403).json({ message: "Authorization failed. User not enough role" })
    Community.findOne({
        _id: req.body.community_id
    }, (err, community) => {
        if (!community) {
            return res.status(500).json({ message: 'Community not found' });
        }
        let newCampaign = new Campaign(req.body);
        newCampaign.save((err, campaign_new) => {
            if (err) {
                return res.status(500).json({
                    message: err
                });
            }
            return res.json(campaign_new)
        })
    })
}
exports.getListCommunities = (req, res) => {
    Community.find((err, data) => {
        if (err) {
            return res.status(500).json({
                message: err
            });
        }
        let res_communities = []
        data.map(community => {
            res_communities.push(
                {
                    _id: community._id,
                    name: community.name,
                    avatar: community.avatar
                }
            )
        })
        res.json(res_communities)
    })
}