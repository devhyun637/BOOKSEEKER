const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const models = require('./models/index.js');


//=========================== DB 연결 ===========================
models.sequelize.sync().then(() => {
    console.log("===========================DB 연결 성공===========================");
}).catch(err => {
    console.log("=========================== DB 연결 실패===========================");
    console.log(err);
});

app.use(cors());

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit:"50mb" }));
//aplication/json
app.use(bodyParser.json({limit:"50mb"}));
app.use(cookieParser());

// =========================== 라우터 ===========================
// 카테고리 관련
app.use('/api/categories', require('./routes/category'));
//해시태그 관련
app.use('/api/hashtags', require('./routes/hashtag'));
// 회원 관련
app.use('/api/users', require('./routes/users'));
// 검색 
app.use('/api/booktrailer/search', require('./routes/search'));
// URL 검색(업로드영상확인)
app.use('/api/booktrailer', require('./routes/URLsearch'));
// 파이썬 서버 테스트
app.use('/api/python', require('./routes/python'));
// 북트레일러 관련
app.use('/api/booktrailer', require('./routes/booktrailer'));

app.listen(port, () => console.log(`=========================== port on ${port} ==========================`));