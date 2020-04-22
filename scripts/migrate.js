const user = require('../models/all')

const Sequelize = require('../config/db');

Sequelize.sync({alter: true});