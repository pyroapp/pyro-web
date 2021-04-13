const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const fs = require("fs");

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

let pathsfile = fs.readdirSync('./paths').filter(file => file.endsWith('.js'));

pathsfile.forEach(file => {
    let path = require(`./paths/${file}`);
    
    switch (path.method) {
        case "get":
            app.get(path.path, (req, res) => {
                log(req);
                path.execute(req, res, web);
            });
            break;
        case "post":
            app.post(path.path, (req, res) => {
                log(req);
                path.execute(req, res, web);
            });
            break;
        /*
        case "type":
            app.type(path.path, (req, res) => {
                log(req);
                path.execute(req, res, web);
            });
            break;
        */
    };
});

/*
app.get('/', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/views/landing.html');
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
*/

app.get('/devs', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/views/developers.html');
});

app.get('*', (req, res) => {
    log(req);

    res.status(200).sendFile(web + '/404.html');
});

app.listen(port, () => {
    console.clear();
    console.info(`Listening on port ${port}`);
});
