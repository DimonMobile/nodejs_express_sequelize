const user = require('../models/user')
user.sync({alter: true});