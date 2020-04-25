const uuid = require('uuid');

const Models = require('../models/all');
const PublicationDraft = Models.PublicationDraft;
const Publication = Models.Publication;

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

exports.postPublication = async function (req, res, next) {
    // TODO: check permissions
    try {
        let trimmedTitle = req.body.title.trim();
        let trimmedContent = req.body.content.trim();
        if (trimmedTitle.length < 5  || trimmedTitle.length > 55) {
            throw new Error("Invalid title length");
        }

        if (trimmedContent.length < 5) {
            throw new Error("Invalid content length");
        }
        let createdPub = await Publication.create({name: req.body.title, content: req.body.content, userId: req.session.userId});
        console.log(createdPub.dataValues.id);
        res.json({success: 'ok', title: req.body.title, content: req.body.content, user: req.session.userNickname});
    } catch (e) {
        res.write(e.message);
    }
}