var express = require('express');

var db = require('../models')

var router = express.Router();
// var watch = require('../models/watch.js');

// get route -> index
router.get('/', function (req, res) {
    res.redirect('/watch');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/watch', function (req, res) {

    db.NewMedia.findAll({
        raw: true
    }).then(function (newmedia) {
        console.log('got these shows back', newmedia)
        res.render('watch', {
            show_data: newmedia
        });
    });
});

// post route -> back to index
router.post('/watch/create', function (req, res) {
    db.NewMedia.create({
        name: req.body.name,
        genre: req.body.genre,
        // mediaType: req.body.mediaType,
        watched: false
    }).then(function (show) {
        console.log('created show', show);
        res.redirect('/');
    })
});

// put route -> back to index
router.put('/watch/:id', function (req, res) {
    db.NewMedia.update({
        watched: true
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.sendStatus(200);
    })
});

// delete route -> back to index
router.delete('/watch/:id', function (req, res) {
    db.NewMedia.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.sendStatus(200);
    })
});

module.exports = router;