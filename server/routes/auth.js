const express = require('express');
const router = express.Router();
const models = require('../models/index');
const {auth} = require('../middleware/auth');



router.get('/api/users/auth', auth, (req, res) => {

    //여기까지 미들웨어 통과해서 왔으면 Authentication이 true라는 말임. 
    //roleId가 0이면 일반유저, 0이 아니면 관리자
    res.status(200).json({
        name: req.user.name,
        isAuth: true,
        email: req.user.email

    })
})

module.exports = router;