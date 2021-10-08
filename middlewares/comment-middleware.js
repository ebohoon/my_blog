const jwt = require("jsonwebtoken")
const User = require("../schemas/user")
const Story = require("../schemas/story")

module.exports = (req, res, next) => {
  const { writeId } = req.params
  const { reid } = req.body
  const { authorization } = req.headers

  const [tokenType, tokenValue] = authorization.split(" ")
  if (!tokenValue || tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    })
    return
  }

  try {
    const { userId } = jwt.verify(tokenValue, "bohoon100")

    User.findOne({ userId }).then((user) => {
      Story.findOne({ writeId }).then((writes) => {
        let rewrites = writes.rewrite.id(reid)
        console.log(rewrites)
        console.log(user)
        if (rewrites.username == user.email) {
          next()
        } else {
          res.status(404).send({
            errorMessage: "누구냐 너.",
          })
        }
      })
    })
  } catch (error) {
    res.status(404).send({
      errorMessage: "누구냐 너.",
    })
    return
  }
}
