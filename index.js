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

const userRouter = require("./routers/user")
app.use("/api", userRouter)

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.get("/", (req, res, next) => {
  res.render("index")
})

//게시물 작성
app.get("/write", (req, res) => {
  res.render("write")
})

//게시물 상세
app.get("/detail", (req, res) => {
  res.render("detail")
})

//게시물 수정
app.get("/revise", (req, res) => {
  res.render("revise")
})

//회원가입
app.get("/signup", (req, res) => {
  res.render("signup")
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
