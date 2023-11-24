import jwt from 'jsonwebtoken';

const jwtVerify = async (req, res, next) => {
  console.log(req.headers);
  let { token, email } = req.headers;

  try {
    await jwt.verify(token, process.env.jwtSecret);
    req.email = email;

    next();
  } catch (err) {
    res.status(401).json('jwt token incorrect');
  }
};

export default jwtVerify;
