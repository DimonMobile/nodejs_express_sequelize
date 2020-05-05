const PublicationDraft = require('./publication_draft');
const User = require('./user');
const Publication = require('./publication');
const Comment = require('./comment')

// Drafts
User.hasMany(PublicationDraft, {
    foreignKey: 'userId'
});
//PublicationDraft.belongsTo(User);

// Publications
User.hasMany(Publication, {
    foreignKey: 'userId'
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Comment.belongsTo(Publication, {
    foreignKey: 'publicationId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

// Exports
exports.PublicationDraft = PublicationDraft;
exports.User = User;
exports.Publication = Publication;
exports.Comment = Comment;