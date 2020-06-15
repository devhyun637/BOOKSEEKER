const express = require('express');
const router = express.Router();
const models = require('../models/index');


//=================================
//             Hashtag
//=================================

// =========================== 카테고리 목록 가져오기 ===========================
router.get('/', (req, res) => {
    models.Category.findAll({}).then(result => {
        return res.json(result);
    })
})

// =========================== 카테고리 선택한 거 가져오기 ===========================
router.post('/select', (req, res) => {
    if (req.body.length === 0) {
        return res.json({
            categorySelectSuccess: false,
            message: "해시태그를 선택해주세요"
        });
    } else {
        return res.json({
            categorySelectSuccess: true,
            message: "해시태그 선택 성공"
        })
    }
});

// =========================== 북트레일러에 해당하는 해시태그 가져오기 ===========================
router.post('/trailer_hashtag', async (req, res) => {
    const booktrailerId = req.body.booktrailerId;
    await models.sequelize.query("SELECT h.id as id, h.hashtagName as hastagName from hashtag as h join trailer_hashtag as th on th.hashtagId = h.id WHERE th.booktrailerId = :booktrailerId", {
        replacements: { booktrailerId: booktrailerId }
    }).then(result =>{
        return res.json({
            success:true,
            hashtags:result
        });
    });
    //해시태그 가져오기
});

router.get('/hashtags', async (req, res) => {
    await models.sequelize.query("SELECT id, hashtagName from hashtag ORDER BY counting DESC LIMIT 12").then(
        result=>{
            return res.json({
                success:true,
                hashtags:result
            })
        }
    );
});

// ========= 해시태그 포스트아이디로 가져오기 =========
router.post('/hashtags', async (req, res) => {
    let postId = req.body.postId;
    await models.sequelize.query("SELECT id, hashtagName from hashtag WHERE postId = :postId").then(result =>{
        return res.json({
            success:true,
            hashtags: result
        })
    });
});

module.exports = router;