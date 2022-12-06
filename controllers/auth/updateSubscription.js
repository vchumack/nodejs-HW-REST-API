const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id, email } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  res.status(201).json({
    email,
    subscription: result.subscription,
  });
};

module.exports = updateSubscription;
