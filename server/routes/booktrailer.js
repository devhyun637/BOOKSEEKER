const express = require('express');
const router = express.Router();
const models = require('../models/index');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

const jwt = require('jsonwebtoken');
const secretObj = require('../config/jwt');
const crypto = require('crypto');


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

    await models.BookTrailer.findOne({ where: { id: booktrailerId } }).then(async booktrailerInfo => {
        await models.User.findOne({ where: { id: booktrailerInfo.dataValues.userId } }).then(async booktrailerUser => {
            await models.Category.findOne({ where: { id: booktrailerInfo.dataValues.categoryId } }).then(async bookTrailerCategory => {
                return res.status(200).json({
                    success: true, booktrailerInfo, booktrailerUser, bookTrailerCategory
                });
            });
        })
    }).catch(err => {
        return res.status(400).send(err)
    })
});

// =========================== 좋아요 하기(상세) ===========================
router.post('/getLike', async (req, res) => {
    var bookTrailerId = req.body.booktrailerId;
    await models.BookTrailer.findOne({
        where: {
            id: bookTrailerId
        }
    }).then(result => {
        return res.json({
            count: result.dataValues.likeCount
        });
    });
});

// =========================== 좋아요 가져오기(상세페이지) ===========================
router.post('/getIsLike', async (req, res) => {
    let userId = req.cookies.id;
    if (userId == null) {
        return res.json({
            isLike: false
        });
    }
    let bookTrailerId = req.body.booktrailerId;
    await models.User_Like.findOne({
        where: {
            userId: userId,
            booktrailerId: bookTrailerId
        }
    }).then(result => {
        if (result) {
            return res.json({
                isLike: true
            });
        } else {
            return res.json({
                isLike: false
            });
        }
    }).catch(e => {
        console.log(e)
    });
});

// =========================== 삭제하기 ===========================
router.post('/delete', async (req, res) => {
    let token = req.cookies.user;
    if (token != null) {
        let decode = false;
        await jwt.verify(token, secretObj.secret, async (err, decoded) => {
            if (err) {
                decode = false;
                return res.json({
                    success: false
                });
            } else {
                decode = decoded;
                let booktrailerId = req.body.booktrailerId;
                let userId = req.cookies.id;
                await models.User_Like.destroy({
                    where: { booktrailerId: booktrailerId }
                }).catch(e => {
                    return res.json({
                        success: false
                    });
                });
                await models.BookTrailer.destroy({
                    where: { id: booktrailerId }
                }).catch(e => {
                    return res.json({
                        success: false
                    });
                });
                return res.json({
                    success: true
                });
            }
        });
    } else {
        return res.json({
            success: false
        });
    }

});

router.post('/countUp', async (req,res) => {
    let booktrailerId = req.body.booktrailerId;
    console.log(req.body);

    models.sequelize.query("UPDATE booktrailer SET watch=watch+1 WHERE id = :booktrailerId",{
        replacements: { booktrailerId: booktrailerId }
    });

});
module.exports = router;