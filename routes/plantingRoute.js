module.exports = (app) => {
    let plantingHandlers = require('../controllers/plantingController');
    app.route('/planting/register_community')
        .post(plantingHandlers.registerCommunity);
    app.route('/planting/register_campaign')
        .post(plantingHandlers.registerCampaign)
    app.route('/planting/get_list_communities')
        .get(plantingHandlers.getListCommunities)
};