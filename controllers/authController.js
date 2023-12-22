const userModel = require('../models/userModel');
const errorResponse = require('../utils/errorResponse');

// JWT token
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

// REGISTER
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Existing user
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return next(new errorResponse("Email is already registered", 500));
    }

    const user = await userModel.create({ username, email, password });
    exports.sendToken(user, 200, res); // Use exports to access sendToken
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// LOGIN
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return next(new errorResponse('Please provide email or password', 400));
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse('Invalid credentials', 401));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse('Invalid credentials', 401));
    }

    // Respond with token
    exports.sendToken(user, 200, res); // Use exports to access sendToken
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// LOGOUT
// LOGOUT
exports.logoutController = async (req, res) => {
  try {
    // Clear the refreshToken cookie
    res.clearCookie('refreshToken');

    // Clear the localStorage token
    localStorage.removeItem('authToken');

    // Respond with success message
    return res.status(200).json({
      success: true,
      message: 'Logout successfully',
    });
  } catch (error) {
    console.error('Logout failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Logout failed',
    });
  }
};

