const express = require('express');
const router = express.Router();

//Schema
const Users = require('../models/Users');

/**
 * @route POST users/
 * @desc Creates a new user
 */
router.post("/", async(req, res) => {
  try {
    const { name, job } = req.body
    const user = new Users({
      name,
      job,
    })
    const data = await user.save()
    res.status(201).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;