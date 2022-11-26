const express = require("express");
const Joi = require("Joi");
const router = express.Router();
const Contact = require("../../models/contacts");
const createError = require("./helpers/createError");

const schemaPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const schemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).or("name", "email", "phone");

const favSchemaUpdate = Joi.object({
  favorite: Joi.boolean().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
      throw createError(404, "Not Found");
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schemaPost.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = schemaUpdate.validate(req.body);

    if (error) {
      throw createError(400, "missing fields");
    }

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw createError(404, "Not Found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { error } = favSchemaUpdate.validate(req.body);

    if (error) {
      throw createError(400, "missing field favorite");
    }

    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw createError(404, "Not Found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw createError(404, "Not Found");
    }

    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
