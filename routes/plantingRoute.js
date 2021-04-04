module.exports = (app) => {
    let plantingHandlers = require('../controllers/plantingController');
    app.route('/planting/register_community')
        .post(plantingHandlers.registerCommunity);
    app.route('/planting/register_campaign')
        .post(plantingHandlers.registerCampaign)
    app.route('/planting/get_list_communities')
        .get(plantingHandlers.getListCommunities)
    app.route('/planting/get_list_campaigns')
        .post(plantingHandlers.getListCampaigns)
    app.route('/planting/get_list_trees')
        .post(plantingHandlers.getListTrees)
};