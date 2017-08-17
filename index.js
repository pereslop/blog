/**
 * Created by mykola on 8/17/17.
 */
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const port = 8080;
const config = require('./config/database');
const path = require('path');
const authefication = require('./routes/authentication')(router);

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('could not connect to database ');
    } else {
        console.log(config.secret);
        console.log('Connected to the database: ' + config.db);
    };
});

app.use(express.static(__dirname + '/client/dist'));
app.use('/authentication', authefication);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});
app.listen(port, () => {
    console.log('Server is working on port' + port);

});


