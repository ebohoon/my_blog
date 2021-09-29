const mongoose = require("mongoose")

const connect = () => {
  mongoose
    .connect("mongodb://test:test@54.180.83.142:27017/my_blog?authSource=admin", {
      useNewUrlParser: true,
    })
    .catch((err) => console.log(err))
}

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err)
})

module.exports = connect
