const mongoose = require("mongoose");

const TheoryQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true }, // The theoretical question
  answer: { type: String, required: true }, // The explanation or answer to the question
  topic: { type: String, required: true }, // e.g., "SQL Basics", "Normalization", "Indexes"
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const TheoryQuestion = mongoose.model("TheoryQuestion", TheoryQuestionSchema);
module.exports = TheoryQuestion;
