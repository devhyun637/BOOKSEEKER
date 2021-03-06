const express = require('express');
const router = express.Router();
const models = require('../models/index');


//=================================
//             Post.js
//=================================

// =========================== 해시태그가져오기 ===========================
router.post('/addhashtags', async (req, res) => {
    let data = req.body;
    let userId = req.cookies.id;
    await models.Post.create({
        userId: userId,
        booktrailerId: data.booktrailerId,
        content: data.content,
        likeCount: 1,
        created_at: new Date,
        updated_at: new Date()
    }).then(async result => {
        models.User_Post.create({
            userId: userId,
            postId: result.dataValues.id,
            created_at: new Date(),
            updated_at: new Date()
        }).catch(e => {
            console.log(e);
        });

        for(let i=0;i<data.hashtags.length;i++){
            let hashtagName = data.hashtags[i];
            await models.Hashtag.findOne({
                where: {
                    hashtagName: hashtagName
                }
            }).then(async hashtag => {
                if(hashtag){
                    await models.sequelize.query("UPDATE hashtag SET counting = counting+1 WHERE hashtagName = :hashtagName",{
                        replacements: {hashtagName: hashtagName}
                    });
                    await models.Post_Hashtag.create({
                        postId: result.dataValues.id,
                        hashtagId: hashtag.dataValues.id,
                        created_at: new Date(),
                        updated_at: new Date()
                    }).catch(e => {
                        console.log(e);
                    })
                }else{
                    await models.Hashtag.create({
                        hashtagName: hashtagName,
                        counting: 1,
                        created_at: new Date(),
                        updated_at: new Date()
                    }).then(async newtag => {
                        await models.Post_Hashtag.create({
                            postId: result.dataValues.id,
                            hashtagId: newtag.dataValues.id,
                            created_at: new Date(),
                            updated_at: new Date()
                        });
                    }).catch(e => {
                        console.log(e);
                    })
                }
            });
        }

    }).catch(e => {
        console.log(e);
    });
    return res.json({
        success:true
    });
});

// =========================== Post 정보 가져오기 ===========================
router.post('/getPost', async (req, res) => {
    const { postId } = req.body;

    models.Post.findOne({ where: { id: postId } }).then(postInfo => {
        return res.status(200).json({
            success: true, 
            data: postInfo
        })
    }).catch(err => {
        return res.status(400).send(err)
    })
});

router.post('/isLike', async (req, res) => {
    let userId = req.cookies.id;
    let postId = req.body.postId;
    await models.User_Post.findOne({
        where:{userId:userId, postId:postId}
    }).then(result => {
        if(result){
            return res.json({
                isLike:true
            });
        }else{
            return res.json({
                isLike:false
            });
        }
    });

});

// =========================== like 정보 업데이트 ===========================
router.post('/updateLike', async (req, res) => {
    let userId = Number(req.cookies.id);
    let postId = Number(req.body.postId);
    await models.Post.findOne({
        where:{id:postId}
    }).then(async post => {
        if(post){
            await models.User_Post.findOne({
                where:{userId:userId,postId:postId}
            }).then(async like => {
                if(like){
                    await models.sequelize.query("UPDATE post SET likeCount = likeCount-1 WHERE id = :postId",{
                        replacements:{postId: postId}
                    }).catch(e => {
                        console.log(e);
                    })
                    await models.User_Post.destroy({
                        where:{userId:userId,postId:postId}
                    }).catch(e => {
                        console.log(e);
                    });
                    return res.json({
                        isLike:false,
                        data:post
                    });
                }else{
                    await models.User_Post.create({
                        userId: userId,
                        postId: postId,
                        created_at: new Date(),
                        updated_at: new Date()
                    }).catch(e => {
                        console.log(e);
                    });
                    await models.sequelize.query("UPDATE post SET likeCount = likeCount+1 WHERE id = :postId",{
                        replacements:{postId: postId}
                    }).catch(e => {
                        console.log(e);
                    })
                    return res.json({
                        isLike:true,
                        data:post
                    });
                }
            }).catch(e => {
                console.log(e);
            });

        }
    })

});

// =========================== Post 정보 삭제하기 ===========================
router.post('/deletePost', async (req, res) => {
    let postId = req.body.postId;
    await models.Comment.destroy({
        where:{
            postId: postId
        }
    }).catch(e =>{
        console.log(e);
        return res.json({
            success:false,
            message:"코멘트 삭제 실패"
        });
    });

    await models.User_Post.destroy({
        where:{
            postId: postId
        }
    }).catch(e =>{
        console.log(e);
        return res.json({
            success:false,
            message:"포스트관계 삭제 실패"
        });
    });

    await models.Post_Hashtag.destroy({
        where:{
            postId: postId
        }
    }).catch(e =>{
        console.log(e);
        return res.json({
            success:false,
            message:"해시태그 삭제 실패"
        });
    });


    await models.Post.destroy({
        where:{
            id: postId
        }
    }).catch(e =>{
        console.log(e);
        return res.json({
            success:false,
            message:"포스트 삭제 실패"
        });
    });

    return res.json({
        success:true
    });
});

module.exports = router;