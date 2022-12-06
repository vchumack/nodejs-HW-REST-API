const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  // console.log(req.user); // здесь будет вся инфа про человека, кот отправил запрос
  const { _id: owner } = req.user; // мы берем оттуда id и добавляем потом к контакту в поле owner
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = add;
