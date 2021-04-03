module.exports = (app) => {
    let plantingHandlers = require('../controllers/plantingController');
    app.route('/planting/register_community')
        .post(plantingHandlers.registerCommunity);
};