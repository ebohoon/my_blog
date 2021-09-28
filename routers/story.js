const express = require("express")
const Goods = require("../schemas/story")

const router = express.Router()

router.get("/goods", async (req, res, next) => {
  try {
    const { category } = req.query

    if ({ category }.category === undefined) {
      const goods = await Goods.find({}).sort("-goodsId")
      res.json({ goods: goods })
    } else {
      const goods = await Goods.find({ category }).sort("-goodsId")
      res.json({ goods: goods })
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})

module.exports = router
