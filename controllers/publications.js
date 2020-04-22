const uuid = require('uuid');

const Models = require('../models/all');
const PublicationDraft = Models.PublicationDraft;
exports.getNewPage = async function (req, res, next) {
    // TODO: check permissions

    let resultUuid = uuid.v4();
    let publicationTitle = 'My new publication';
    let publicationContent = '';
    let isDraft = false;
    if (req.query.recoverDraft) {
        let draft = await PublicationDraft.findOne({
            where: {
                uuid: req.query.recoverDraft,
                userId: req.session.userId
            }
        });
        if (draft) {
            resultUuid = draft.uuid;
            publicationTitle = draft.title;
            publicationContent = draft.content;
            isDraft = true;
        } else {
            res.redirect('/publications/new');
        }
    }
    res.render('publications/new', { title: 'New publication', publicationTitle: publicationTitle, publicationContent: publicationContent, req: req, res: res, uuid: resultUuid, isDraft: isDraft });
}
