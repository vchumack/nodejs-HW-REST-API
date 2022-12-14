const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findOneAndUpdate(
    {
      _id: id,
      owner: req.user._id,
    },
    req.body,
    { new: true }
  );

  if (!result) {
    throw createError(404);
  }

  res.status(200).json(result);
};

module.exports = updateFavorite;
