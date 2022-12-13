const Jimp = require("jimp");
const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  // const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  const avatarDir = path.join(__dirname, "../../", "public", "avatars");

  try {
    const { path: tempDir, originalname } = req.file;
    const [extention] = originalname.split(".").reverse();
    const avatarName = `${_id}.${extention}`;
    const uploadDir = path.join(avatarDir, avatarName);

    const img = await Jimp.read(tempDir);
    // console.log(img);
    await img.resize(250, 250).writeAsync(uploadDir);

    await fs.unlink(req.file.path);

    // await fs.rename(tempDir, uploadDir);
    const avatarURL = path.join("avatars", avatarName);

    const result = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    );

    res.json({ avatarURL: result.avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    next(error);
  }
};

module.exports = updateAvatar;
