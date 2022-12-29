const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { createError, sendEmail, createVerifyEmail } = require("../../helpers");
const { nanoid } = require("nanoid");

const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  console.log(subscription);
  const user = await User.findOne({ email });

  // проверка, есть ли уже в базе пользователь с таким же Email
  if (user) {
    throw createError(409, "Email in use");
  }

  // хеширование пароля
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  // если такого нет, то зарегистрировали и отправили на фронтенд ответ
  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = createVerifyEmail(email, verificationToken);

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = signup;
