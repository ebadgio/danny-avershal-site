const express = require('express');
const session = require('express-session');
const compress = require('compression');
const path = require('path');
const bodyParser = require('body-parser');


// const sslRedirect = require('heroku-ssl-redirect');

// Create instance of express server
const app = express();

// When Heroku is set up: enable ssl redirect
// app.use(sslRedirect());

const buildPath = path.join(__dirname, '..', 'public');
//
app.use(express.static(buildPath));
app.use(compress());

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use('*', (req, res) => {
    return res.sendFile(buildPath);
});

// Handles unknown routes
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    console.log(err);
    return res.send('404: Page Not Found');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});