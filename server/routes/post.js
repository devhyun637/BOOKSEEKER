const express = require('express');
const router = express.Router();
const models = require('../models/index');


//=================================
//             Cost
//=================================

// =========================== 해시태그 추가하기 ===========================
router.post('/addhashtags', async (req, res) => {
    let data = req.body;
    let userId = req.cookies.id;
    await models.Post.create({
        userId: userId,
        booktrailerId: data.booktrailerId,
        content: data.content,
        like: 1,
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



module.exports = router;