import User from '../models/userModel';

export const updatePassword = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  await user.res.status(200).json({
    message: '成功',
  });
});
