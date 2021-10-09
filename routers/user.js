const express = require("express")
const User = require("../schemas/user")
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middlewares/auth-middleware")
const Joi = require("joi")

const router = express.Router()

const postUsersSchema = Joi.object({
  nickname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
})
//회원가입
router.post("/users", async (req, res) => {
  try {
    const { nickname, email, password, confirmPassword } = await postUsersSchema.validateAsync(
      req.body
    )

    if (password != confirmPassword) {
      res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다",
      })
      return
    }

    const existUsers = await User.find({
      $or: [{ email }, { nickname }],
    })
    if (existUsers.length) {
      res.status(400).send({
        errorMessage: "이미 가입된 이메일 또는 닉네임이 있습니다.",
      })
      return
    }

    if (!/^[0-9a-z+]{3,}/gi.test(nickname)) {
      res.status(400).send({ errorMessage: "닉네임을 확인하세요" })
      return
    }
    if (!/^[0-9a-z]{4,}/gi.test(password)) {
      res.status(400).send({
        errorMessage: "비밀번호가 4자 이하거나 닉네임과 같은 값이 있습니다.",
      })
      return
    }

    const user = new User({ email, nickname, password })
    await user.save()

    res.status(201).send({})
  } catch (err) {
    console.log(err)
    res.status(400).send({
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
    })
  }
})

//로그인
router.post("/auth", async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email, password }).exec()

  if (!user) {
    res.status(401).send({
      errorMessage: "이메일 또는 패스워드가 잘못됐습니다",
    })
    return
  }
  const token = jwt.sign({ userId: user.userId }, "bohoon100")
  console.log(token)
  res.send({
    token,
  })
})

//내 정보 조회
router.get("/users/me", authMiddleware, async (req, res) => {
  const { user } = res.locals
  console.log(res.locals)

  res.send({
    email: user.email,
    nickname: user.nickname,
  })
})

module.exports = router
