const express = require("express")
const stories = require("../schemas/story")
const authMiddleware = require("../middlewares/auth-middleware")

const v1 = require("uuid")
require("date-utils")

const router = express.Router()

router.get("/stories", async (req, res, next) => {
  try {
    const { writeId } = req.query

    if ({ writeId }.writeId === undefined) {
      const story = await stories.find({}).sort("-writeId")
      res.json({ story: story })
    } else {
      const story = await stories.find({ writeId }).sort("-writeId")
      res.json({ story: story })
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})
//상세페이지 api
router.get("/stories/:writeId", async (req, res) => {
  const { writeId } = req.params
  const writes = await stories.findOne({ writeId: writeId })
  if (writes == null) {
    res.send({ result: "게시물이존재하지않습니다." })
  } else {
    res.json({ story: writes })
  }
})
//수정 페이지 api (인증미들웨어 추가)
router.get("/story/:writeId", authMiddleware, async (req, res) => {
  const { writeId } = req.params
  const writes = await stories.findOne({ writeId: writeId })
  if (writes == null) {
    res.send({ result: "게시물이존재하지않습니다." })
  } else {
    res.json({ story: writes })
  }
})

router.post("/stories", authMiddleware, async (req, res) => {
  const { title, thumbnailUrl, story, pw } = req.body
  test = v1.v1().split("-")
  let writeId = test[2] + test[1] + test[0] + test[3] + test[4]
  let newDate = new Date()
  let date = newDate.toFormat("YYYY,MM,DD HH24:MI:SS")
  try {
    await stories.create({ writeId, title, thumbnailUrl, story, date, pw })
    res.send({ result: "success" })
  } catch (err) {
    console.log(err)
    res.send({ result: "err" })
  }
})

router.delete("/stories/:writeId", authMiddleware, async (req, res) => {
  const { writeId } = req.params
  const { title, thumbnailUrl, story, pw } = req.body
  const iswrite = await stories.find({ writeId })
  if (iswrite.length > 0) {
    if (pw == iswrite[0]["pw"]) {
      await stories.deleteOne({ writeId })
      res.send({ result: "success" })
    } else {
      res.status(400).send({ result: "err" })
    }
  }
})

router.patch("/stories/:writeId", authMiddleware, async (req, res) => {
  const { writeId } = req.params
  const { title, thumbnailUrl, story, pw } = req.body
  const iswrite = await stories.find({ writeId })
  if (iswrite.length > 0) {
    if (pw == iswrite[0]["pw"]) {
      await stories.updateOne({ writeId }, { $set: { title, thumbnailUrl, story } })
      res.send({ result: "success" })
    } else {
      res.status(400).send({ result: "err" })
    }
  }
})

module.exports = router
