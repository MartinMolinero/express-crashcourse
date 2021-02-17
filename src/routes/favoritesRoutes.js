const express = require('express');
const router = express.Router();

//Schema
const Videos = require('../models/Videos');
const Users = require('../models/Users');
const Favorites = require('../models/Favorites');

/**
 * @route GET videos/
 * @desc Fetches all the available videos
 */
router.get("/", async(req, res) => {
  const favorites  = await Favorites.find({}).populate({path: 'user', model: 'Users'}).populate({path: 'video', model: 'Videos'})
  if (favorites.length > 0){
    res.json(favorites)
    return
  }
  res.status(404).json({message: 'No favorites found'})
});

/**
 * @route GET favorites/:id
 * @desc Fetch one video info
 */
router.get("/:id", async(req, res) => {
  try {
    const { id } = req.params
    const favorite  = await Favorites.findById({_id: id}).populate({path: 'user', model: 'Users'}).populate({path: 'video', model: 'Videos'})
    res.json(favorite)
  } catch (error) {
    res.status(404).json(error)
  }
});


/**
 * @route POST favorites/
 * @desc Creates a new favorite
 */
router.post("/", async(req, res) => {
  try {
    const { user, video } = req.body
    const favorite = new Favorites({
      user,
      video,
    })
    const data = await favorite.save()
    res.status(201).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
});

/**
 * @route DELETE favorites/:id
 * @desc Deletes a favorite
 */
router.delete("/:id", async(req, res) => {
  try {
    const { id } = req.params
    const favorite  = await Favorites.findByIdAndDelete({_id: id}).populate({path: 'user', model: 'Users'}).populate({path: 'video', model: 'Videos'})
    res.status(200).json(favorite)
  } catch (error) {
    res.status(500).json(error)
  }
});


module.exports = router;
