const express = require("express");
const {
  getAllProblemSets,
  updateStatus,
} = require("../controllers/InterviewController"); // Import the controller function
const router = express.Router();

// Route to get all problem sets
router.get("/problem-sets", getAllProblemSets);

router.put("/update-status", updateStatus);

module.exports = router;
