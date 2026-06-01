const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    businessName: {
      type: String,
      default: "",
    },

    industry: {
      type: String,
      default: "",
    },

    products: {
      type: String,
      default: "",
    },

    services: {
      type: String,
      default: "",
    },

    targetAudience: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Business",
  businessSchema
);