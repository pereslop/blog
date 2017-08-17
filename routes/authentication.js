/**
 * Created by mykola on 8/17/17.
 */
const User = require('../models/user');

module.exports = (router) => {
    router.post('/register', (req, res) => {
        res.send('hello word');
    });
    return router;
}