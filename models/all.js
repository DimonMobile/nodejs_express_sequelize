const PublicationDraft = require('./publication_draft');
const User = require('./user');

// relations
User.hasMany(PublicationDraft, {
    foreignKey: 'userId'
});
PublicationDraft.belongsTo(User);

exports.PublicationDraft = PublicationDraft;
exports.User = User;