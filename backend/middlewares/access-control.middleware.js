const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization ?? req.headers['x-auth-token'];

    console.log(authHeader);


    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Access denied',
      });
    }

    const token = authHeader.split(' ')[1];

    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenVerified) {
      console.log('not verified yet', token);
      return res.status(401).json({
        success: false,
        message: 'Access denied',
      });
    }

    const decoded = jwt.decode(token);

    // * Attaching the decoded user to the request
    req.body.api_user = decoded;

    // * Continue to the next middleware - If any
    next();
  } catch (err) {
    console.error('Token Error', err);
    res.status(401).json({
      success: false,
      message: 'Access denied',
    });

  }
};

const adminOnly = async (req, res, next) => {
  try {
    const user = req.body.api_user;

    const { role } = user.user;
    console.log({ role });

    if (role !== 'admin') {
      res.status(401).json('Access Denied! This is only for admins');
      return;
    }
    next();
  } catch (err) {
    console.error('Admin middleware error', err);
    res.status(401).json({
      success: false,
      message: 'Access Denied! This is only for admins',
    });
  }
};

module.exports = { adminOnly, verifyToken }