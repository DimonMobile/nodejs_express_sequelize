const express = require('express');
const session = require('express-session');
const Handlebars = require('express-handlebars');
const WebSocketServer = require('./config/websocket');

const exphbs = Handlebars.create({
    extname: 'hbs',
    helpers: {
        ifEquals: function (arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        },

        ifGreaterOrEqual: function (arg1, arg2, options) {
            return (arg1 >= arg2) ? options.fn(this) : options.inverse(this);
        }
    }
});

const router = require('./routes/main').router;

const app = express();

const HOST_PROTO = 'http';
const HOST_PORT = 3000;
const HOST_ADDRESS = 'localhost';

app.use(session({ secret: 'mega secret' }));
app.use('/public', express.static('static'));
app.use(express.urlencoded({ extended: false }));

app.engine('hbs', exphbs.engine);
app.set('view engine', 'hbs');

app.use('/', router);

app.listen(HOST_PORT);
console.log(`${HOST_PROTO}://${HOST_ADDRESS}:${HOST_PORT}`);