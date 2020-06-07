const express = require('express');
const router = express.Router();
const models = require('../models/index');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


//=================================
//             bookTrailer
//=================================


// =========================== 북트레일러 가져오기 ===========================
router.get('/video', async (req, res) => {
    var userId = req.cookies.id;
    var user = await models.User.findOne({ where: { id: userId } });
    var userName = user.dataValues.name;
    models.BookTrailer.findAll({ where: { userId: userId } }).then(async result => {
        answer = []
        for (var i = 0; i < result.length; i++) {
            var hashtags = []
            await models.sequelize.query("SELECT h.hashtagName as hashtag from hashtag as h join trailer_hashtag as th on h.id = th.hashtagId WHERE th.booktrailerId = :booktrailerId", {
                replacements: { booktrailerId: result[i].dataValues.id }
            }).then(res => {
                var hashResult = res[0];
                for (var i = 0; i < hashResult.length; i++) {
                    hashtags.push(JSON.stringify(hashResult[i].hashtag));
                }
            });
            var comment = await models.sequelize.query("SELECT c.comment as comment from comment as c join post as p on c.postId = p.id join booktrailer as b on p.booktrailerId = b.id WHERE b.id = :booktrailerId", {
                replacements: { booktrailerId: result[i].dataValues.id }
            });
            answer.push({
                id: result[i].dataValues.id,
                userName: userName,
                URL: result[i].dataValues.URL,
                likeCount: result[i].dataValues.likeCount,
                hashtags: hashtags,
                comments: comment
            });

        }
        return res.json({
            isSearchSuccess: true,
            data: answer
        });
    }).catch(err => {
        return res.json({
            isSearchSuccess: false,
            message: "wrongUserInformation"
        });
    });
});

// =========================== 북트레일러 가져오기(상세페이지) ===========================
router.post("/getVideo", multipartMiddleware, async (req, res) => {
    let booktrailerId = req.body.booktrailerId;
    
    //TODO : 함수 수정하기
    let booktailerInfo = await models.BookTrailer.findOne({ where: { id: booktrailerId } });
    let booktrailerUser = await models.User.findOne({ where: { id: booktailerInfo.dataValues.userId } });
    let bookTrailerCategory = await models.Category.findOne({ where: { id: booktailerInfo.dataValues.categoryId } });

    models.BookTrailer.findOne({ where: { id: booktrailerId } }).then(booktrailerInfo => {
        return res.status(200).json({
            success: true, booktrailerInfo, booktrailerUser, bookTrailerCategory
        })
    }).catch(err => {
        return res.status(400).send(err)
    })

    // if (booktailerInfo) {
    //     return res.status(200).json({
    //         success: true, booktrailerInfo, booktrailerUser
    //     })
    // } else {
    //     return res.status(400).send(err)
    // }
});

module.exports = router;