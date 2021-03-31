module.exports = (app) => {
    let userHandlers = require('../controllers/userController.js');
    let firebaseHandlers = require('../controllers/firebaseController.js');
    app.route('/auth/register')
        .post(userHandlers.register);
    app.route('/auth/sign_in')
        .post(userHandlers.sign_in);
    app.route('/auth/firebase')
        .post(firebaseHandlers.sign_in)
    app.route('/user/profile')
        .get(userHandlers.profile)
};