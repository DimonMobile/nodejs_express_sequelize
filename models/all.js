const PublicationDraft = require('./publication_draft');
const User = require('./user');
const Publication = require('./publication');
const Comment = require('./comment')

// Drafts
User.hasMany(PublicationDraft, {
    foreignKey: 'userId'
});
PublicationDraft.belongsTo(User);

// Publications
User.hasMany(Publication, {
    foreignKey: 'userId'
});
Publication.belongsTo(User);

// Comments
User.hasMany(Comment, {
    foreignKey: 'userId'
});

Publication.hasMany(Comment, {
    foreignKey: 'publicationId'
});

Comment.belongsTo(User);
Comment.belongsTo(Comment);

// Exports
exports.PublicationDraft = PublicationDraft;
exports.User = User;
exports.Publication = Publication;
exports.Comment = Comment;