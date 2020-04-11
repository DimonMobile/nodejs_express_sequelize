const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars').create({extname: 'hbs'});
const router = require('./routes/main').router;

const app = express();

const HOST_PROTO = 'http';
const HOST_PORT = 3000;
const HOST_ADDRESS = 'localhost';

app.use(session({secret: 'mega secret'}));
app.use('/public', express.static('static'));
app.use(express.urlencoded({extended: false}));

app.engine('hbs', exphbs.engine);
app.set('view engine', 'hbs');

app.use('/', router);

app.listen(HOST_PORT);
console.log(`${HOST_PROTO}://${HOST_ADDRESS}:${HOST_PORT}`);