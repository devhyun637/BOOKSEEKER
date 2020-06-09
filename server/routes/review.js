const express = require('express');
const router = express.Router();
const models = require('../models/index');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


//=================================
//             review
//=================================

// =========================== 북트레일러 가져오기(상세페이지) ===========================
router.post("/saveReview", (req, res) => {
    //5050 let emotion = axios.get(/getEmotion);

    const review = req.body;

    if (!req.cookies.id) {
        return res.json({
            success: false
        })
    } else {
        models.Review.create({
            userId: req.cookies.id,
            booktrailerId: review.booktrailerId,
            review: review.review
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

// =========================== 댓글 모두 가져오기(상세페이지) ===========================
router.post("/getReviews", (req, res) => {
    const booktrailerId = req.body.booktrailerId;

    models.Review.findAll({ where: { booktrailerId: booktrailerId } }).then(result => {
        return res.status(200).json({
            success: true, result
        })
    }).catch(e => {
        return res.status(400).send(err)
    });

});

// =========================== 댓글 삭제하기 ===========================
router.post("/deleteReview", (req, res) => {
    const { reviewId } = req.body;
    const { userId } = req.body;

    if (userId != req.cookies.id) {
        return res.status(400)
    } else {
        models.Review.destroy({ where: { id: reviewId, userId: userId } }).then(result => {
            return res.status(200).json({
                success: true, result
            })
        }).catch(e => {
            return res.status(400).send(err)
        });
    }
});

module.exports = router;