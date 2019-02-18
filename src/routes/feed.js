let express = require('express');
let socket = require('socket.io');
let router = express.Router();
let FeedModel = require('../models/FeedModel');

// Create new feed
// POST /
router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Req body is missing');
  }

  let model = new FeedModel(req.body);

  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(201).send(doc);
    })
    .catch(err => {
      console.log(err);
    });
});

// Get feed
// GET /
router.get('/', (req, res) => {
  let feedObj = FeedModel.find()
    .sort({ _id: -1 })
    .limit(10)
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  socket().emit('output', feedObj);
  return feedObj;
});

module.exports = router;
