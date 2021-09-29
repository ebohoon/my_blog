const mongoose = require("mongoose")

const { Schema } = mongoose
const storySchema = new Schema({
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
})

module.exports = mongoose.model("Story", storySchema)
