const mongoose = require("mongoose");

const knowledgeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: String,

    content: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Knowledge",
  knowledgeSchema
);