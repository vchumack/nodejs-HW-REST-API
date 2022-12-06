const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  // const result = await Contact.findById(id);

  const result = await Contact.findOne({
    id,
    owner: req.user._id,
  });

  if (!result) {
    throw createError(404);
  }

  res.status(200).json(result);
};

module.exports = getById;
