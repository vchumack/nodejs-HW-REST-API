const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { createError } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  // проверка, есть ли уже в базе пользователь с таким же Email
  if (user) {
    throw createError(409, "Email in use");
  }

  // хеширование пароля
  const hashPassword = await bcrypt.hash(password, 10);

  // если такого нет, то зарегистрировали и отправили на фронтенд ответ
  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = signup;
