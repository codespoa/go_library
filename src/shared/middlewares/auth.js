const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../config/auth');
const User = require('../models/User');

const auth = (roles = null) => async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const userID = req.params.userID || req.params.userId;

  if (!authHeader)
    return res.status(400).json({ errors: ['Token not provided'] });

  const [, token] = authHeader.split(' ');

  try {
    const tokenDecoded = await promisify(jwt.verify)(token, authConfig.secret);
    if (!tokenDecoded)
      return res.status(401).json({ errors: ['Decoded token error'] });

    const { _id } = tokenDecoded.tokenUser;

    const user = await User.findById(_id).lean();

    if (!user)
      return res.status(401).json({ errors: ['Usuário inexistente'] });

    if (!user.active)
      return res.status(401).json({ errors: ['Usuário inativo'] });

    user._id = String(user._id);


    if (roles && user.role !== 'admin' && !roles.includes(user.role) && roles != "self")
      return res.status(401).json({
        errors: [
          `This user don't have role to access this route, only roles has permitted ${
            Array.isArray(roles) ? roles.join(', ') : roles
          }`,
        ],
      });

    if (roles && roles === 'self')
      if (userID != user._id && !(user.role === 'admin'))
        return res.status(403).json({ errors: ['Usuário não permitido'] });
    
    if (tokenDecoded.school) req.school = tokenDecoded.school;
    req.tokenUser = { ...user, school: tokenDecoded.school };
    req[user.role] = true;
    
    return next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ errors: ['Token invalid'] });
  }
};

module.exports = auth;
