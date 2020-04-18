const Sequelize = require('sequelize');
const db = require('../config/db');

let publication_draft = db.define('publication_draft', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT
    },
}, {
    indexes: [{
        unique: true,
        fields: ['userId']
    }]
});

module.exports = publication_draft;