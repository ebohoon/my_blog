const mongoose = require("mongoose")

const { Schema } = mongoose
const storySchema = new Schema({
  writeId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
    unique: true,
  },
  story: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
  pw: {
    type: String,
    required: true,
    unique: true,
  },
})

module.exports = mongoose.model("Story", storySchema)
