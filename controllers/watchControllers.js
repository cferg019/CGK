var express = require('express');
var axios = require('axios');
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
router.post('/watch', function (req, res) {

    var queryURL = "https://www.omdbapi.com/?t=" + req.body.name + "&apikey=trilogy";

    axios.get(queryURL)
        // Get the OMDB Data
        .then(response => {
            console.log('heres the data back from omdb', response.data)
            return {
                posterUrl: response.data.Poster,
                rating: response.data.imdbRating,
                year: response.data.Year
            }
        })
        // Something went wrong getting ombd data, but let's just skip it
        .catch(err => {
            console.log('the ombd call failed', err)
            return {};
        })
        // Create the Media object
        .then(omdbData => {
            console.log('got to this part', omdbData)
            return db.NewMedia.create({
                name: req.body.name,
                genre: req.body.genre,
                mediaType: req.body.mediaType,
                watched: false,
                UserId: req.user.id,
                rating: omdbData.rating,
                posterUrl: omdbData.posterUrl,
                year: omdbData.year
            })
        })
        // Respond back to the browser.
        .then(function (show) {
            console.log('created show', show);
            res.json(show);
        })
        .catch(err => {
            console.log('we got an error', err)
            res.status(500).send("Internal Server Error.");
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