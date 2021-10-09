const jwt = require("jsonwebtoken")
const User = require("../schemas/user")
const Story = require("../schemas/story")

module.exports = (req, res, next) => {
  const { writeId } = req.params
  const { reid } = req.body
  console.log(reid)
  const { authorization } = req.headers

  const [tokenType, tokenValue] = authorization.split(" ")
  console.log(tokenValue)
  if (!tokenValue || tokenType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    })
    return
  }

  try {
    const { userId } = jwt.verify(tokenValue, "bohoon100")
    console.log(1111111111111111111)
    console.log(userId)

    User.findById(userId).then((user) => {
      console.log(user)
      Story.findOne({ writeId }).then((writes) => {
        let rewrites = writes.rewrite.id(reid)

        console.log(rewrites)
        console.log("====================")
        console.log(user)
        if (rewrites.username == user.nickname) {
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
