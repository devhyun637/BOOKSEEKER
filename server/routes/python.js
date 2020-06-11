const express = require('express');
const router = express.Router();
const axios = require('axios');

const host = 'localhost';
const port = 5050;


router.get('/test', (req, res) => {

    axios.get(`http://${host}:${port}/python/user`).then(result => {
        return res.json({
            data: result.data
        });
    }).catch(e => {
        console.log(e);
    });
});

router.get('/case1', (req, res) => {

    axios.get(`http://${host}:${port}/python/case1`).then(result => { 
        return res.json({
            data: result.data
        });
    }).catch(e => {
        console.log(e);
    });
});

router.get('/case2', (req, res) => {

    axios.get(`http://${host}:${port}/python/case2`).then(result => {
        return res.json({
            data: result.data
        });
    }).catch(e => {
        console.log(e);
    });
});

router.post('/case3', (req, res) => {

    axios.get(`http://${host}:${port}/python/case3/`+589).then(result => {
        return res.json({
            data: result.data
        });
    }).catch(e => {
        console.log(e);
    });
});

router.post('/case4', (req, res) => {

    axios.get(`http://${host}:${port}/python/case4/`+589).then(result => {
        return res.json({
            data: result.data
        });
    }).catch(e => {
        console.log(e);
    });
});

router.post('/case5', (req, res) => {

    axios.get(`http://${host}:${port}/python/case5/`+589).then(result => {
        return res.json({
            data: result.data
        });
    }).catch(e => {
        console.log(e);
    });
});

router.post('/case6', (req, res) => {

    axios.get(`http://${host}:${port}/python/case6/`+589).then(result => {
        return res.json({
            data: result.data
        });
    }).catch(e => {
        console.log(e);
    });
});

router.post('/case7', (req, res) => {

    axios.get(`http://${host}:${port}/python/case7/`+589).then(result => {
        return res.json({
            data: result.data
        });
    }).catch(e => {
        console.log(e);
    });
});

module.exports = router;