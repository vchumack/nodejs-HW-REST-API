const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const verifyEmail = {
    to: email,
    subject: "Verify you email",
    html: `<a target='_blank' href='${BASE_URL}/api/users/verify/${verificationToken}'>Click verify you email</a>`,
  };

  return verifyEmail;
};

module.exports = createVerifyEmail;
