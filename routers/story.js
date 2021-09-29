const express = require("express")
const stories = require("../schemas/story")
const v1 = require("uuid")
require("date-utils")

const router = express.Router()

router.get("/stories", async (req, res, next) => {
  try {
    const { category } = req.query

    if ({ category }.category === undefined) {
      const story = await stories.find({}).sort("-writeId")
      res.json({ story: story })
    } else {
      const story = await stories.find({ category }).sort("-writeId")
      res.json({ story: story })
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get("/stories/:writeId", async (req, res) => {
  const { writeId } = req.params
  const writes = await stories.findOne({ writeId: writeId })
  if (writes == null) {
    res.send({ result: "게시물이존재하지않습니다." })
  } else {
    res.json({ detail: writes })
  }
})

router.post("/stories", async (req, res) => {
  const { title, thumbnailUrl, story } = req.body
  test = v1.v1().split("-")
  let writeId = test[2] + test[1] + test[0] + test[3] + test[4]
  let newDate = new Date()
  let date = newDate.toFormat("YYYY,MM,DD HH24:MI:SS")
  try {
    await stories.create({ writeId, title, thumbnailUrl, story, date })
    res.send({ result: "success" })
  } catch (err) {
    console.log(err)
    res.send({ result: "err" })
  }
})

module.exports = router
