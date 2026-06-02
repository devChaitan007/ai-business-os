const fs = require("fs");
const pdfParse = require("pdf-parse");

const Knowledge = require("../models/Knowledge");

const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const dataBuffer = fs.readFileSync(
      req.file.path
    );

    const pdfData = await pdfParse(
      dataBuffer
    );

    const knowledge =
      await Knowledge.create({
        userId: req.user.id,
        title: req.file.originalname,
        content: pdfData.text,
      });

    fs.unlinkSync(req.file.path);

    res.json({
      message: "PDF uploaded",
      knowledge,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadPDF,
};