const express = require('express');
const router = express.Router();
const models = require('../models/index');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


//=================================
//             comment
//=================================

// =========================== 댓글 모두 가져오기(상세페이지) ===========================
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

module.exports = router;