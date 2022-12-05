const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user; // мы берем оттуда id и добавляем потом к контакту в поле owner
  // console.log(req.query); // а здесь лежит всё, что есть в запросе, параметры запроса

  const { page = 1, limit = 10, ...query } = req.query;

  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner, ...query },
    "-createdAt -updatedAd",
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");

  res.status(200).json(result);
};

module.exports = getAll;
