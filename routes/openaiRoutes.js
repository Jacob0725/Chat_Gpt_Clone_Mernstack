const express = require("express");
const { summaryController,paragraphController, chatbotController,jsconverterController,scifiimageController } = require("../controllers/openAiController");
const router = express.Router();

// Route
router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatbotController);
router.post("/jsconverter",jsconverterController);
router.post("/scifiimage" , scifiimageController);

module.exports = router;
