const express = require('express');
const router = express.Router();
const Joi = require("joi");
const { Alice } = require('../models/Alice');


router.get('/details/:alice', async (req, res) => {
  try {

    const alice = await Alice.findOne({ alice: req.params.alice}); 
    if (!alice) return res.status(404).send('Alice does not exists.');
    //console.log(email)
    res.send(alice);
  } catch (error) {
    res.status(500).send('Server error');
  }
});
module.exports = router;