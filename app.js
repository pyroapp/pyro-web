const express = require('express');
const cors = require('cors');
const chalk = require('chalk');

const app = express();
const port = 8000;

function log(req) {
    console.log(`${chalk.green('Path')} ${req.path} ${chalk.blueBright('Address')} ${req.headers['x-forwarded-for'] || 'Unknown'}`);
}

// ------------------------------------------------------------
//  API
// ------------------------------------------------------------



// ------------------------------------------------------------
//  WEBSITE
// ------------------------------------------------------------
const web = __dirname + '/public';

app.use(cors());
app.use('/', express.static(web));

app.get('/', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/views/home.html');
});

app.get('/login', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/views/login/login.html');
});

app.get('/signup', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/views/login/signup.html');
});

app.get('/forgotpassword', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/views/login/forgotpassword.html');
});

app.get('/unabletoregister', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/views/login/unabletoregister.html');
});

app.get('/direct/:userID/:recipientID', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/views/direct.html');
});

app.get('/server/:serverID/:channelID', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/views/server.html');
});

app.get('*', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/404.html');
});

app.listen(port, () => {
    console.clear();
    console.info(`Listening on port ${port}`);
});