const express = require('express');
const router = express.Router();
const models = require('../models/index');


//=================================
//             Category
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
            message: "카테고리를 선택해주세요"
        });
    } else {
        return res.json({
            categorySelectSuccess: true,
            message: "선택 성공"
        })
    }
})

module.exports = router;
