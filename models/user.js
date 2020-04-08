const Sequelize = require('sequelize');
const db = require('../config/db');

let user = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nick: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});

module.exports = user;