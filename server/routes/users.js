const express = require('express');
const router = express.Router();
const models = require('../models/index');

const jwt = require('jsonwebtoken');
const secretObj = require('../config/jwt');
const crypto = require('crypto');


//=================================
//             Users
//=================================

// =========================== 회원 이메일 불러오기 ===========================
router.get('/', async (req, res) => {
    //Where절 추가?(관리자 1, 회원2)
    models.User.findAll({
        attributes: ['email']
    }).then(result => {
        return res.json(result);
    })
})

// =========================== 회원가입 ===========================
router.post('/register', (req, res) => {
    userInfo = req.body;
    //비밀번호 일치 여부 확인하기
    if (userInfo.password !== userInfo.confirmpassword) {
        return res.json({
            isRegisterSuccess: false,
            message: "passwordMissmatch"
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
        age: userInfo.age,
        gender: userInfo.gender,
        roleId: 2
    }).then(result => {
        for (var i = 0; i < userInfo.categoryIds.length; i++) {
            //유저-카테고리 관계 추가
            models.User_Category.create({
                userId: result.dataValues.id,
                categoryId: userInfo.categoryIds[i]
            });

            //카테고리 count증가(*)
            models.sequelize.query("UPDATE category_id SET counting=counting+1 WHERE id = :id", {
                replacements: { id: userInfo.categoryIds[i] }
            });
        }
        console.log("================== user_info insert success ==================");
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
            message: "duplicated Email"
        });
    });
});

// =========================== 로그인 하기 ===========================
router.post('/login', async function (req, res) {
    //토큰 생성하기
    let token = jwt.sign({
        email: req.body.email+Date.now()
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
            message: "Wrong Email"
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
            message: "Wrong Password"
        })
    } else {
        //비밀번호가 맞으면 토큰 Cookie에 저장하기
        res.cookie("user", token);
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
    console.log(token);
    if(token!=null){
        let decode = false;
        jwt.verify(token, secretObj.secret, (err,decoded) => {
            if(err){
                decode = false;
            }else{
                decode = decoded;
            }
        });
        if(decode){
            return res.send({
                verify: true
            });
        }else{
            return res.send({
                verify: false
            });
        }
    }else{
        return res.send({
            verify: false
        });
    }
})

module.exports = router;