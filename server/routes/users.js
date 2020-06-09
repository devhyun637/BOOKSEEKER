const express = require('express');
const router = express.Router();
const models = require('../models/index');

const jwt = require('jsonwebtoken');
const secretObj = require('../config/jwt');
const crypto = require('crypto');

const S3config = require('../config/S3Config');
const AWS = require('aws-sdk');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


//=================================
//             Users
//=================================

// =========================== 회원 이메일 불러오기 ===========================
router.get('/emails', async (req, res) => {
    //Where절 추가?(관리자 1, 회원2)
    models.User.findAll({
        attributes: ['email']
    }).then(result => {
        return res.json(result);
    })
})

// =========================== 회원 이름 불러오기 ===========================
router.get('/name', async (req, res) => {
    //Where절 추가?(관리자 1, 회원2)
    models.User.findAll({
        attributes: ['name']
    }).then(result => {
        return res.json(result);
    })
})

// =========================== 회원가입 ===========================
router.post('/register', (req, res) => {
    userInfo = req.body;
    birthDateInfo = userInfo.birthDate.split('/');
    userBirth = new Date(birthDateInfo[0], birthDateInfo[1] - 1, birthDateInfo[2]);
    userAge = new Date().getFullYear() - userBirth.getFullYear();
    //비밀번호 일치 여부 확인하기
    if (userInfo.password !== userInfo.confirmpassword) {
        return res.json({
            isRegisterSuccess: false,
            message: "비밀번호가 일치하지 않습니다."
        });
    }
    //비밀번호 암호화
    var inputPassword = userInfo.password;
    var salt = Math.round((new Date().valueOf() * Math.random())) + "";
    var hashPassword = crypto.createHash('sha512').update(inputPassword + salt).digest('hex');

    //정보 저장하기
    models.User.create({
        userID: userInfo.email,
        password: hashPassword,
        salt: salt,
        name: userInfo.name,
        image_profile: userInfo.profile_image,
        created_at: new Date(),
        updated_at: new Date(),
        age: userAge,
        gender: userInfo.gender,
        roleId: 2,
        score: 0
    }).then(async result => {
        for (var i = 0; i < userInfo.categoryIds.length; i++) {
            //유저-카테고리 관계 추가
            models.User_Category.create({
                userId: result.dataValues.id,
                categoryId: userInfo.categoryIds[i]
            });
            //카테고리 count증가(*)
            models.sequelize.query("UPDATE category SET counting=counting+1 WHERE id = :id", {
                replacements: { id: userInfo.categoryIds[i] }
            });
        }
        console.log("================== user_info insert success ==================");

        for (var i = 0; i < userInfo.book.length; i++) {
            var tagName = userInfo.book[i];
            await models.Hashtag.findOne({ where: { hashtagName: tagName } })
                .then(tagResult => {
                    var hashtagId = 0;
                    if (tagResult != null) {
                        models.sequelize.query("UPDATE hashtag SET counting=counting+1 WHERE id = :id", {
                            replacements: { id: tagResult.dataValues.id }
                        });
                        hashtagId = tagResult.dataValues.id;
                        //유저-해시태그 관계 추가
                        models.User_Hashtag.create({
                            userId: result.dataValues.id,
                            hashtagId: hashtagId
                        });
                    } else {
                        models.Hashtag.create({
                            hashtagName: tagName,
                            counting: 1,
                            created_at: new Date(),
                            updated_at: new Date()
                        }).then(res => {
                            hashtagId = res.dataValues.id;
                            //유저-해시태그 관계 추가
                            models.User_Hashtag.create({
                                userId: result.dataValues.id,
                                hashtagId: hashtagId,
                                created_at: new Date(),
                                updated_at: new Date()
                            });
                        }).catch(err => {
                            console.log(err);
                        });
                    }
                }).catch(err => {
                    console.log("find 에러");
                });
        }

        return res.json({
            isRegisterSuccess: true,
            user: result,
            categorys: userInfo.categorys
        });
        //이메일 중복 또는 에러 확인
    }).catch(err => {
        console.log(err);
        return res.json({
            isRegisterSuccess: false,
            message: "중복된 이메일입니다."
        });
    });
});

// =========================== 로그인 하기 ===========================
router.post('/login', async function (req, res) {
    //토큰 생성하기
    let token = jwt.sign({
        email: req.body.email + Date.now()
    },
        secretObj.secret,
        {
            //회원 로그인 60분 유지
            expiresIn: '60m'
        });

    //이메일로 회원 찾기
    var result = await models.User.findOne({
        where: {
            email: req.body.email
        }
    });

    //가입이 안되어있는 이메일
    if (result == null) {
        return res.json({
            loginSuccess: false,
            message: "해당 이메일로 가입된 아이디가 없습니다."
        });
    }

    //입력한 비밀번호 암호화하기
    var dbPassword = result.dataValues.password;
    var inputPassword = req.body.password;
    var salt = result.dataValues.salt;
    var hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

    //비밀번호가 틀림
    if (dbPassword != hashPassword) {
        return res.json({
            loginSuccess: false,
            message: "비밀번호가 일치하지 않습니다."
        })
    } else {
        //비밀번호가 맞으면 토큰 Cookie에 저장하기
        res.cookie("user", token);
        res.cookie("id", result.dataValues.id);
        return res.json({
            loginSuccess: true,
            email: result.dataValues.email,
            name: result.dataValues.name,
            token: token
        });
    }
});



// =========================== 로그아웃 하기 ===========================
router.get('/logout', (req, res) => {
    if (req.cookies.user) {
        res.clearCookie('user');
        res.clearCookie('id');
        console.log("token remove success");
        return res.status(200).send({
            isLogoutSuccess: true
        });
    } else {
        console.log('not logined');
    }
});

// =========================== 페이지 인증 ===========================
router.get('/auth', (req, res) => {
    let token = req.cookies.user;
    if (token != null) {
        let decode = false;
        jwt.verify(token, secretObj.secret, (err, decoded) => {
            if (err) {
                decode = false;
                return res.json({
                    verify: false
                });
            } else {
                decode = decoded;
                return res.json({
                    verify: true
                });
            }
        });
    } else {
        return res.json({
            verify: false
        });
    }
});

// =========================== 유저 찾기 ===========================
router.get('/search', (req, res) => {
    var userId = req.cookies.id;
    models.User.findOne({ where: { id: userId } }).then(result => {
        return res.json({
            isSearchSuccess: true,
            email: result.dataValues.userID,
            name: result.dataValues.name
        });
    }).catch(err => {
        return res.json({
            isSearchSuccess: false,
            message: "wrongUserInformation"
        });
    });
});

// =========================== 비디오 업로드하기 ===========================
router.post('/videoUpload', multipartMiddleware, async (req, res) => {
    var userInfo = req.body;
    var userId = req.cookies.id;
    var thumbnailName = userInfo.title + Date.now();

    var imageExtension = userInfo.thumbnail.split(';')[0].split('/');
    imageExtension = imageExtension[imageExtension.length - 1];

    buf = new Buffer(userInfo.thumbnail.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    const s3 = new AWS.S3({ accessKeyId: S3config.ID, secretAccessKey: S3config.SECRET });
    const param = {
        'Bucket': S3config.BUCKET_NAME,
        'Key': 'image/' + thumbnailName,
        'Body': buf,
        'ContentType': 'image/' + imageExtension
    }

    s3.upload(param, function (err, data) {
        console.log(err);
        console.log(data);
    });


    await models.BookTrailer.create({
        title: userInfo.title,
        thumbnail: thumbnailName,
        author: userInfo.author,//복수 확인
        content: userInfo.desc,
        likeCount: 1,
        URL: userInfo.url,
        categoryId: userInfo.category,
        bookTitle: userInfo.bookTitle,
        bookPublisher: userInfo.publisher,
        watch: 1,
        userId: userId,
        created_at: new Date(),
        updated_at: new Date()
    }).then(async result => {
        for (var i = 0; i < userInfo.hashtag.length; i++) {
            await models.Hashtag.findOne({ where: { hashtagName: userInfo.hashtag[i] } })
                .then(async hashtag => {
                    if (hashtag == null) {
                        await models.Hashtag.create({
                            hashtagName: userInfo.hashtag[i],
                            counting: 1
                        }).then(async res => {
                            await models.Trailer_Hashtag.create({
                                booktrailerId: result.dataValues.id,
                                hashtagId: res.dataValues.id,
                                counting: 1
                            });
                        }).catch(e => {
                            console.log("해시태그 생성 실패");
                            console.log(e);
                            return res.json({
                                isUploadSuccess: false,
                                message: "해시태그 생성 오류"
                            })
                        });
                    } else {
                        await models.Trailer_Hashtag.findOne({
                            where: {
                                booktrailerId: result.dataValues.id,
                                hashtagId: hashtag.dataValues.id
                            }
                        })
                            .then(async trailer_hashtag => {
                                if (trailer_hashtag == null) {
                                    await models.Trailer_Hashtag.create({
                                        booktrailerId: result.dataValues.id,
                                        hashtagId: hashtag.dataValues.id,
                                        counting: 1
                                    });
                                } else {
                                    await models.sequelize.query("UPDATE trailer_hashtag SET counting=counting+1 WHERE booktrailerId = :booktrailerId AND hashtagId = :hashtagId", {
                                        replacements: { booktrailerId: result.dataValues.id, hashtagId: hashtag.dataValues.id }
                                    });
                                }
                            });


                    }
                });
        }
        await models.Post.create({
            userId: userId,
            booktrailerId: result.dataValues.id,
            content: userInfo.desc,
            like: 1,
            created_at: new Date(),
            updated_at: new Date()
        }).then(async postResult => {
            await models.User_Post.create({
                userId: userId,
                postId: postResult.dataValues.id
            });
        });

    }).catch(err => {
        console.log("트레일러 생성 오류");
        console.log(err);
        return res.json({
            isUploadSuccess: false,
            message: "트레일러 생성 오류"
        })
    });

    return res.json({
        isUploadSuccess: true,
        data: userInfo
    });
});

// =========================== 팔로우 하기 ===========================
router.post('/follow', async (req, res) => {
    bookTrailerUserId = Number(req.body.bookTrailerUserId);
    let userId = Number(req.cookies.id);
    if (userId) {
        await models.Follow.findOne({ where: { userId: userId, friendId: bookTrailerUserId } })
            .then(async follow => {
                if (follow) {
                    await models.Follow.destroy({
                        where: {
                            userId: userId,
                            friendId: bookTrailerUserId
                        }
                    }).then(result => {
                        return res.json({
                            success: true,
                            data: 0
                        });
                    }).catch(e => {
                        console.log(e);
                    });
                } else {
                    await models.Follow.create({
                        userId: userId,
                        friendId: bookTrailerUserId
                    }).then(result => {
                        return res.json({
                            success: true,
                            data: 1
                        });
                    }).catch(e => {
                        console.log(e);
                    });
                }

            });
    } else {
        return res.json({
            sucess: false,
            message: "로그인 해주세요"
        });
    }
});

// =========================== 팔로우유무파악 ===========================
router.post('/followex', async (req, res) => {
    bookTrailerUserId = Number(req.body.bookTrailerUserId);
    let userId = Number(req.cookies.id);
    console.log(userId,bookTrailerUserId);
    if (userId) {
        await models.Follow.findOne({ where: { userId: userId, friendId: bookTrailerUserId } })
            .then(async follow => {
                if (follow) {
                    return res.json({
                        color: '#6C757D'
                    });
                } else {
                    return res.json({
                        color: '#ff3232'
                    });
                }
            });
    } else {
        return res.json({
            color: '#ff3232'
        });
    }
});

// =========================== 좋아요 수정 ===========================
router.post("/changeLike", async (req, res) => {
    let userId = req.cookies.id;
    if (userId == null) {
        return res.json({
            success: false,
            message: "로그인을 해주세요"
        });
    }
    let bookTrailerId = req.body.booktrailerId;
    let isLike = req.body.isLike;

    if (isLike == "true") {
        await models.User_Like.destroy({
            where: {
                userId: userId,
                booktrailerId: bookTrailerId
            }
        }).then(async result => {
            await models.sequelize.query("UPDATE booktrailer SET likeCount=likeCount-1 WHERE id = :id", {
                replacements: { id: bookTrailerId }
            }).then(result2 => {
                return res.json({
                    success: true,
                });
            })
        });

    } else if (isLike == "false") {
        await models.User_Like.create({
            userId: userId,
            booktrailerId: bookTrailerId,
            created_at: new Date(),
            updated_at: new Date()
        }).then(async result => {
            await models.sequelize.query("UPDATE booktrailer SET likeCount=likeCount+1 WHERE id = :id", {
                replacements: { id: bookTrailerId }
            }).then(result2 => {
                return res.json({
                    success: true,
                });
            })
        })
    } else {
        return res.json({
            success: false,
            message: "오류"
        });
    }
});

// =========================== 팔로잉중인가 ===========================
router.post('/isFollowing', async (req, res) => {
    let userId = req.cookies.id;
    if (userId == null) {
        return res.json({
            isFollowing: false
        });
    }
    let friendId = req.body.bookTrailerUserId;
    models.Follow.findOne({ where: { userId: userId, friendId: friendId } }).then(result => {
        if (result) {
            return res.json({
                isFollowing: true
            });
        } else {
            return res.json({
                isFollowing: false
            })
        }
    });
});

// =========================== 회원 정보 가져오기 ===========================
router.post('/getUser', async (req, res) => {
    const { userId } = req.body;

    models.User.findOne({ where: { id: userId } }).then(userInfo => {
        return res.status(200).json({
            success: true, userInfo
        })
    }).catch(err => {
        return res.status(400).send(err)
    })
})

module.exports = router;