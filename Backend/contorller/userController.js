const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsyncError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(201).json({
    status: "success",
    data: {
      tour: users,
    },
  });
});
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "This route is not defined yet!",
  });
};
exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "This route is not defined yet!",
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "err",
    message: "This route is not defined yet!",
  });
};
