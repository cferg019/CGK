var express = require('express');

var db = require('../models')

var router = express.Router();
// var watch = require('../models/watch.js');

router.use(function (req, res, next) {
    if (!req.user) {
        res.redirect('/login')
    } else {
        next();
    }
});

// get route -> index
router.get('/', function (req, res) {
    res.redirect('/watch');
});

router.get('/watch', function (req, res) {
    db.NewMedia.findAll({
        raw: true,
        where: {
            UserId: req.user.id
        }
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
        watched: false,
        UserId: req.user.id
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