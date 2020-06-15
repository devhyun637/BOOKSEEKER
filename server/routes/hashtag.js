const express = require('express');
const router = express.Router();
const models = require('../models/index');


//=================================
//             Hashtag
//=================================

// =========================== ===========================
router.get('/', (req, res) => {
    models.Category.findAll({}).then(result => {
        return res.json(result);
    })
})

// =========================== ===========================
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
    }).then(result => {
        return res.json({
            success: true,
            hashtags: result
        });
    });
    //해시태그 가져오기
});

router.get('/hashtags', async (req, res) => {
    await models.sequelize.query("SELECT id, hashtagName from hashtag ORDER BY counting DESC LIMIT 12").then(
        result => {
            return res.json({
                success: true,
                hashtags: result
            })
        }
    );
});

// ========= 해시태그 포스트아이디로 가져오기 =========
router.post('/getHashtags', async (req, res) => {
    let postId = req.body.postId;
    let hashtags = [];

    await models.sequelize.query("SELECT h.hashtagName as hashtagName from hashtag as h join post_hashtag as ph on h.id = ph.hashtagId WHERE ph.postId = :postId", {
        replacements: { postId: postId }
    }).then(result => {
        for (let i = 0; i < result[0].length; i++) {
            hashtags.push(result[0][i].hashtagName);
        }
        return res.json({
            success: true,
            hashtags: hashtags
        })
    });
});

module.exports = router;