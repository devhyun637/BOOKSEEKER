const express = require('express');
const router = express.Router();
const models = require('../models/index');


//=================================
//             Quiz
//=================================

// =========================== 퀴즈등록하기 ===========================
router.post('/quizUpload', async (req, res) => {

    let userId = req.body.userId
    let booktrailerId = req.body.booktrailerId
    let question = req.body.question
    let answer = req.body.answer

    if (!req.cookies.id) {
        return res.json({
            success: false
        })
    } else {
        await models.BooktrailerQuiz.create({
            userId: userId,
            booktrailerId: booktrailerId,
            question: question,
            answer: answer
        }).then(async result => {
            return res.status(200).json({
                success: true, result
            })
        }).catch(e => {
            return res.json({
                success: false
            })
        })
    }

})

// =========================== 퀴즈 가져오기 ===========================
router.post('/getQuiz', async (req, res) => {
    let booktrailerId = req.body.booktrailerId
    //console.log(booktrailerId)

    models.BooktrailerQuiz.findAll({ where: { booktrailerId: booktrailerId } }).then(result => {
        return res.status(200).json({
            success: true, result
        })
    }).catch(e => {
        return res.status(400).send(err)
    });


})

module.exports = router;