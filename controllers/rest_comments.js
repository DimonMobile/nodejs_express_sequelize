const Models = require('../models/all');
const Comment = Models.Comment;
const User = Models.User;
const Publication = Models.Publication;


exports.getComments = async function (req, res, next) {
    try {
        if (req.query.publication === undefined) {
            throw new Error('Wrong usage');
        }
        let publicationId = parseInt(req.query.publication);

        let offset = 0;
        if (req.query.offset !== undefined) {
            offset = parseInt(req.query.offset);
        }

        let comments = await Comment.findAll({
            where: {
                publicationId: publicationId,
            },
            order: [
                ['updatedAt', 'DESC']
            ],
            include: [{
                model: User,
                required: true
            },{
                model: Publication,
                required: true
            }],
            limit: 10,
            offset: offset
        });

        let resultArray = [];
        for (let comment of comments) {
            resultArray.push({
                createdAt: comment.dataValues.createdAt,
                userId: comment.dataValues.userId,
                userNickname: comment.dataValues.nick
            });
        }

        let result = {success: true, items: resultArray};
        res.json(result);
    } catch (e) {
        res.statusCode = 400;
        res.json({ error: e.message });
    }
}

exports.postComment = async function (req, res, next) {
    try {

    } catch (e) {
        res.json({ error: e.message });
    }
}

exports.deleteComment = async function (req, res, next) {
    try {
        // res.json({success: true, destroyed: destroyed});
    } catch (e) {
        res.json({ error: e.message });
    }
}