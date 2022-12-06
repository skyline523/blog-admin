const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

exports.signup = async (req, res) => {
  const user = await User.create(req.body);

  const token = user.generateToken();

  res.status(201).json({
    status: 'success',
    token,
    user,
  });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: '邮箱和密码不能为空',
    });
  }

  const user = await User.findOne({ email }).select('+password');

  // 为了保证user不存在时不会执行验证密码
  if (!user || !(await user.validatePassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: '邮箱或密码错误',
    });
  }

  const token = user.generateToken();

  res.status(200).json({
    status: 'success',
    token,
  });
};

// 获取用户信息
exports.getUserInfo = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: '请先登录',
    });
  }

  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return res.status(401).json({
      status: 'fail',
      message: '登录已过期',
    });
  }

  res.status(200).json({
    status: 'success',
    data: decoded,
  });
};

// 认证
exports.authToken = async (req, res, next) => {
  // 1) get token
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: '请先登录',
    });
  }

  // 2) check token
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return res.status(401).json({
      status: 'fail',
      message: '登录已过期',
    });
  }

  // 3) check user exist
  const freshUser = await User.findById(decoded._id);
  if (!freshUser) {
    return res.status(401).json({
      status: 'fail',
      message: '当前用户不存在',
    });
  }

  req.user = freshUser;
  next();
};

// 授权
exports.restrictTo = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      status: 'fail',
      message: '无权访问',
    });
  }

  next();
};
