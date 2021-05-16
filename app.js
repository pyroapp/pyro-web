const express = require('express');
const cors = require('cors');
const chalk = require('chalk');

const app = express();
const port = 8000;

function log(req) {
    console.log(`${chalk.green('Path')} ${req.path}`);
}


// ------------------------------------------------------------
//  WEBSITE
// ------------------------------------------------------------
const web = __dirname + '/public';

app.use(cors());
app.use('/', express.static(web));

app.get('/', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/views/landing.html');
});

app.get('/new', (req, res) => {
    log(req);
    
    res.status(200).sendFile(web + '/views/new-landing.html');
});

app.get('/login', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/views/login.html');
});

app.get('/signup', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/views/signup.html');
});

app.get('/channels/:guildId/', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/views/app.html');
});

app.get('/channels/:guildId/:channelId', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/views/app.html');
});

app.get('*', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/404.html');
});

app.listen(port, () => {
    console.clear();
    console.info(`Listening on port ${port}`);
});