import jwt, { decode } from "jsonwebtoken";

function auth(req, res, next) {
  const authurizationHeader = req.headers.authorization;

  if (typeof authurizationHeader === "undefined") {
    return res.status(401).json("Not authorized");
  }

  const [bearer, token] = authurizationHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).json("Not authorized");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).json("Not authorized");
    }

    console.log(decode);

    req.user = {
      id: decode.id,
      name: decode.name,
    };

    next();
  });
}

export default auth;
