const jwt = require("jsonwebtoken")
const User = require("../schemas/user")

module.exports = (req, res, next) => {
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
    User.findById(userId).then((user) => {
      res.locals.user = user
      next()
    })
  } catch (error) {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    })
  }
}
