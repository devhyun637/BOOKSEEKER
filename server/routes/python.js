const express = require('express');
const router = express.Router();
const axios = require('axios');

const host = 'localhost';
const port = 5050;


router.get('/test', (req, res) => {

    axios.get(`http://${host}:${port}/user`).then(result => {
        return res.json({
            data: result.data
        });
    }).catch(e => {
        console.log(e);
    });
});

router.get('/case1', (req, res) => {

    axios.get(`http://${host}:${port}/case1`).then(result => { 
        return res.json({
            data: result.data
        });
    }).catch(e => {
        console.log(e);
    });
});

router.get('/case2', (req, res) => {

    axios.get(`http://${host}:${port}/case2`).then(result => {
        return res.json({
            data: result.data
        });
    }).catch(e => {
        console.log(e);
    });
});

router.get('/case3/1', (req, res) => {

    axios.get(`http://${host}:${port}/case3/1`).then(result => {
        return res.json({
            data: result.data
        });
    }).catch(e => {
        console.log(e);
    });
});

router.get('/case7/1', (req, res) => {

    axios.get(`http://${host}:${port}/case7/1`).then(result => {
        return res.json({
            data: result.data
        });
    }).catch(e => {
        console.log(e);
    });
});

module.exports = router;