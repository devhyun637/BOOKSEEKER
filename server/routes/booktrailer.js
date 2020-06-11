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

    await models.User.findOne({
        where: { id: userId }
    }).then(async user => {
        await models.Post.findAll({
            where: { userId: userId }
        }).then(async posts => {
            if (posts.length == 0) {
                return res.json({
                    data: { userName: user.dataValues.name }
                });
            }
            let postResults = []
            for (let i = 0; i < posts.length; i++) {
                let postComments = []
                await models.Comment.findAll({
                    where: { postId: posts[i].id }
                }).then(comments => {
                    for (let i = 0; i < comments.length; i++) {
                        postComments.push(comments[i].comment);
                    }
                });
                await models.sequelize.query("SELECT h.hashtagName as hashtag from hashtag as h join post_hashtag as ph on h.id = ph.hashtagId WHERE ph.postId = :postId", {
                    replacements: { postId: posts[i].id }
                }).then(async hashtags => {
                    await models.BookTrailer.findOne({
                        where: { id: posts[i].booktrailerId }
                    }).then(booktrailer => {
                        if (booktrailer != null) {
                            postResults.push({
                                id: booktrailer.dataValues.id,
                                postId: posts[i].dataValues.id,
                                userName: user.name,
                                title: booktrailer.dataValues.title,
                                thumbnail: booktrailer.dataValues.thumbnail,
                                content: posts[i].dataValues.content,
                                likeCount: posts[i].dataValues.likeCount,
                                URL: booktrailer.dataValues.URL,
                                comments: postComments,
                                hashtags: hashtags,
                                created_at: posts[i].dataValues.createdAt
                            })
                        }
                    });
                });
            }
            //for문 끝
            return res.json({
                data: postResults
            });
        });
    });

});

router.get('/followVideo', async (req, res) => {
    var userId = req.cookies.id;

    await models.Follow.findAll({
        where: { userId: userId }
    }).then(async friends => {
        if (friends.length == 0) {
            return res.json({
                data: { userName: "정보없음" }
            });
        }
        let friendsResult = []
        for (let i = 0; i < friends.length; i++) {
            await models.User.findOne({
                where: { id: friends[i].dataValues.friendId }
            }).then(async user => {
                await models.Post.findAll({
<<<<<<< HEAD
                    where: { userId: user.dataValues.id }
                }).then(async posts => {
=======
                    where: { userId: user.id }
                }).then(async posts => {
                    console.log(posts);
>>>>>>> 9e5eeb5cd5ab6d63abbdc54ab2251ef04ea7461c
                    if (posts.length != 0) {
                        for (let i = 0; i < posts.length; i++) {
                            let postComments = []
                            await models.Comment.findAll({
<<<<<<< HEAD
                                where: { postId: posts[i].dataValues.id }
=======
                                where: { postId: posts[i].id }
>>>>>>> 9e5eeb5cd5ab6d63abbdc54ab2251ef04ea7461c
                            }).then(comments => {
                                for (let i = 0; i < comments.length; i++) {
                                    postComments.push(comments[i].comment);
                                }
                            });
                            await models.sequelize.query("SELECT h.hashtagName as hashtag from hashtag as h join post_hashtag as ph on h.id = ph.hashtagId WHERE ph.postId = :postId", {
<<<<<<< HEAD
                                replacements: { postId: posts[i].dataValues.id }
                            }).then(async hashtags => {
                                await models.BookTrailer.findOne({
                                    where: { id: posts[i].dataValues.booktrailerId }
                                }).then(booktrailer => {
                                    if (booktrailer != null) {
                                        friendsResult.push({
                                            id: booktrailer.dataValues.id,
                                            postId: posts[i].dataValues.id,
                                            userName: user.name,
                                            title: booktrailer.dataValues.title,
                                            thumbnail: booktrailer.dataValues.thumbnail,
                                            content: posts[i].dataValues.content,
                                            likeCount: posts[i].dataValues.likeCount,
                                            URL: booktrailer.dataValues.URL,
                                            comments: postComments,
                                            hashtags: hashtags,
                                            created_at: posts[i].dataValues.createdAt
=======
                                replacements: { postId: posts[i].id }
                            }).then(async hashtags => {
                                await models.BookTrailer.findOne({
                                    where: { id: posts[i].booktrailerId }
                                }).then(booktrailer => {
                                    if (booktrailer != null) {
                                        friendsResult.push({
                                            id: booktrailer.id,
                                            postId: posts[i].id,
                                            userName: user.name,
                                            title: booktrailer.title,
                                            thumbnail: booktrailer.thumbnail,
                                            content: posts[i].content,
                                            likeCount: posts[i].likeCount,
                                            URL: booktrailer.URL,
                                            comments: postComments,
                                            hashtags: hashtags,
                                            created_at: posts[i].createdAt
>>>>>>> 9e5eeb5cd5ab6d63abbdc54ab2251ef04ea7461c
                                        })
                                    }
                                });
                            });
                        }
                    }
                });
            });
        }
        return res.json({
            data: friendsResult
        });
    })

});

// =========================== 북트레일러 가져오기(상세페이지) ===========================
router.post("/getVideo", multipartMiddleware, async (req, res) => {
    let booktrailerId = req.body.booktrailerId;

    await models.BookTrailer.findOne({ where: { id: booktrailerId } }).then(async booktrailerInfo => {
        await models.User.findOne({ where: { id: booktrailerInfo.dataValues.userId } }).then(async booktrailerUser => {
            await models.Category.findOne({ where: { id: booktrailerInfo.dataValues.categoryId } }).then(async bookTrailerCategory => {
                await models.sequelize.query("SELECT h.hashtagName from hashtag as h join trailer_hashtag as th on th.hashtagId = h.id WHERE th.booktrailerId = :booktrailerId", {
                    replacements: { booktrailerId: booktrailerId }
                }).then(hashtags => {
                    return res.status(200).json({
                        success: true, booktrailerInfo, booktrailerUser, bookTrailerCategory, hashtags
                    });
                })
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

router.post('/countUp', async (req, res) => {
    let booktrailerId = req.body.booktrailerId;
    console.log(req.body);

    models.sequelize.query("UPDATE booktrailer SET watch=watch+1 WHERE id = :booktrailerId", {
        replacements: { booktrailerId: booktrailerId }
    });

});
module.exports = router;