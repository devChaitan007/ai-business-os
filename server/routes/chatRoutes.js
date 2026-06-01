const express = require("express");
const Chat = require("../models/Chat");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE NEW CHAT
router.post("/new", protect, async (req, res) => {
  const chat = await Chat.create({
    userId: req.user.id,
    title: "New Chat",
    messages: [],
  });

  res.json(chat);
});


// GET ALL CHATS (SIDEBAR LIST)
router.get("/", protect, async (req, res) => {
  const chats = await Chat.find({ userId: req.user.id })
    .sort({ updatedAt: -1 });

  res.json(chats);
});


// GET SINGLE CHAT
router.get("/:id", protect, async (req, res) => {
  const chat = await Chat.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  res.json(chat);
});


// ADD MESSAGE TO CHAT
router.post("/:id/message", protect, async (req, res) => {
  try {
    const { role, content } = req.body;

    const chat = await Chat.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    chat.messages.push({
      role,
      content,
    });

    if (
      chat.title === "New Chat" &&
      role === "user"
    ) {
      chat.title = content.slice(0, 30);
    }

    await chat.save();

    res.json(chat);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;