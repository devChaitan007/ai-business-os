const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: String,

    phone: String,

    company: String,

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Won",
        "Lost",
      ],
      default: "New",
    },

    notes: {
      type: String,
      default: "",
    },

    followUpDate: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Lead",
  leadSchema
);