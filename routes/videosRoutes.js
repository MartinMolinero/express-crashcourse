const express = require('express');
const router = express.Router();

//Schema
const Videos = require('../models/Videos');

/**
 * @route GET videos/
 * @desc Fetches all the available videos
 */
router.get("/", async(req, res) => {
  const videos  = await Videos.find({})
  console.log('videos', videos)
  if (videos.length){
    res.json(videos)
  }
  res.status(404).json({message: 'No videos found'})
});

/**
 * @route GET videos/:id
 * @desc Fetch one video info
 */
router.get("/:id", async(req, res) => {
  try {
    const { id } = req.params
    const video  = await Videos.findById({_id: id})
    res.json(video)
  } catch (error) {
    res.status(500).json(error)
  }
});


/**
 * @route POST videos/
 * @desc Creates a new video
 */
router.post("/", async(req, res) => {
  try {
    const { title, description, image, youtubeLink } = req.body
    const video = new Videos({
      title,
      description,
      image,
      youtubeLink,
    })
    const data = await video.save()
    res.json(data)
  } catch (error) {
    res.status(500).json(error)
  }
});

/**
 * @route PUT videos/:id
 * @desc Updates a video
 */
router.put("/:id", async(req, res) => {
  try {
    const { id } = req.params
    // const { title, description, image, youtubeLink } = req.body
    const newData = {
      ...req.body
    }

    Videos.findByIdAndUpdate(
      { _id: id },
      newData,
      function(err, result) {
        if (err) {
          res.status(500).json(err)
        } else {
          res.json(result)
        }
      }
    );
  } catch (error) {
    res.status(500).json(error)
  }
});

/**
 * @route DELETE videos/:id
 * @desc Deletes a video
 */
router.delete("/:id", async(req, res) => {
  try {
    const { id } = req.params
    const video  = await Videos.findByIdAndDelete({_id: id})
    res.status(200).json(video)
  } catch (error) {
    res.status(500).json(error)
  }
});


module.exports = router;
