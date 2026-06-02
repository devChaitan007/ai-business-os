const Knowledge = require("../models/Knowledge");

const addKnowledge = async (req, res) => {
  try {
    const { title, content } = req.body;

    const item = await Knowledge.create({
      userId: req.user.id,
      title,
      content,
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getKnowledge = async (req, res) => {
  try {
    const items = await Knowledge.find({
      userId: req.user.id,
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addKnowledge,
  getKnowledge,
};