const express = require("express")
const app = express()
const port = 3000

const connect = require("./schemas")
connect()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("public"))

const storyRouter = require("./routers/story")
app.use("/api", storyRouter)

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.get("/", (req, res, next) => {
  res.render("index")
})

//게시물 한가지
app.get("/write", (req, res) => {
  let num = req.query.name
  res.render("write", { num })
})

//게시물 올리기
app.get("/upwrite", (req, res) => {
  res.render("upwrite")
})

//게시물 삭제,수정
app.get("/delwrite", (req, res) => {
  let num = req.query.name
  res.render("delwrite", { num })
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
