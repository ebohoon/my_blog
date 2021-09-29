const express = require("express")
const stories = require("../schemas/story")

const router = express.Router()

router.get("/stories", async (req, res, next) => {
  try {
    const { category } = req.query

    if ({ category }.category === undefined) {
      const story = await stories.find({})
      res.json({ story: stories })
    } else {
      const story = await stories.find({ category })
      res.json({ story: stories })
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.post("/stories", async (req, res) => {
  const { title, thumbnailUrl, story } = req.body

  await stories.create({ title, thumbnailUrl, story })

  res.send({ result: "success" })
})

module.exports = router
