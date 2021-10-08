const mongoose = require("mongoose")

const { Schema } = mongoose

const rewriteSchema = new Schema({
  rebody: {
    type: String,
  },
  pw: {
    type: String,
  },
  username: {
    type: String,
  },
})

const storySchema = new Schema({
  writeId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  pw: {
    type: String,
    required: true,
  },
  rewrite: {
    type: [rewriteSchema],
    required: false,
  },
})

module.exports = mongoose.model("Story", storySchema)
