const Business = require("../models/Business");

// Create or Update Business
const saveBusiness = async (req, res) => {
  try {
    const {
      businessName,
      industry,
      products,
      services,
      targetAudience,
      website,
    } = req.body;

    let business = await Business.findOne({
      userId: req.user.id,
    });

    if (business) {
      business.businessName = businessName;
      business.industry = industry;
      business.products = products;
      business.services = services;
      business.targetAudience = targetAudience;
      business.website = website;

      await business.save();

      return res.json(business);
    }

    business = await Business.create({
      userId: req.user.id,
      businessName,
      industry,
      products,
      services,
      targetAudience,
      website,
    });

    res.status(201).json(business);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Business
const getBusiness = async (req, res) => {
  try {
    const business = await Business.findOne({
      userId: req.user.id,
    });

    res.json(business);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  saveBusiness,
  getBusiness,
};