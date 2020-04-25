const PublicationDraft = require('./publication_draft');
const User = require('./user');
const Publication = require('./publication');

// relations
User.hasMany(PublicationDraft, {
    foreignKey: 'userId'
});
PublicationDraft.belongsTo(User);

User.hasMany(Publication, {
    foreignKey: 'userId'
});
Publication.belongsTo(User);

exports.PublicationDraft = PublicationDraft;
exports.User = User;