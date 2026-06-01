const Chat = require("../models/Chat");
const Lead = require("../models/Lead");
const Business = require("../models/Business");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalChats = await Chat.countDocuments({
      userId,
    });

    const totalLeads = await Lead.countDocuments({
      userId,
    });

    const businessProfile =
      await Business.findOne({
        userId,
      });

    const recentChats = await Chat.find({
      userId,
    })
      .sort({ updatedAt: -1 })
      .limit(5);

    const recentLeads = await Lead.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalChats,
      totalLeads,
      businessProfileComplete:
        !!businessProfile,
      recentChats,
      recentLeads,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};