const Lead = require("../models/Lead");

// Create Lead
const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(lead);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(leads);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Lead
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      {
        returnDocument: "after",
      }
    );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.json(lead);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Lead
const deleteLead = async (req, res) => {
  try {
    await Lead.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({
      message: "Lead deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
};