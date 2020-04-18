const user = require('../models/user')
const publication_draft = require('../models/publication_draft')

publication_draft.belongsTo(user);
user.hasMany(publication_draft);

const Sequelize = require('../config/db');
Sequelize.sync({alter: true});