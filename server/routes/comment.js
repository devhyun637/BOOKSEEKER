const express = require('express');
const router = express.Router();
const models = require('../models/index');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


//=================================
//             comment
//=================================

// =========================== 댓글 모두 가져오기 ===========================
router.post("/getComments", (req, res) => {
    const postId = req.body.postId;

    models.Comment.findAll({ where: { postId: postId } }).then(result => {
        return res.status(200).json({
            success: true, result
        })
    }).catch(e => {
        return res.status(400).send(err)
    });

});

// =========================== 댓글 저장하기 ===========================
router.post("/saveComment", (req, res) => {
    //5050 let emotion = axios.get(/getEmotion);

    const comment = req.body;

    if (!req.cookies.id) {
        return res.json({
            success: false
        })
    } else {
        models.Comment.create({
            userId: req.cookies.id,
            postId: comment.postId,
            comment: comment.comment
            // emotion: emotion
        }).then(result => {
            return res.status(200).json({
                success: true, result
            })
        }).catch(e => {
            return res.status(400).send(err)
        });
    }

});

module.exports = router;