const mongoose = require("mongoose");

const ProblemSetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  topic: { type: String, required: true },
  psLink: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: "Invalid URL format",
    },
  },
  articleLink: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: "Invalid URL format",
    },
  },
  completionStatus: {
    type: Boolean,
    default: false,
  },
  revisionMark: {
    type: Boolean,
    default: false,
  },

  tags: [String],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ProblemSet = mongoose.model("ProblemSet", ProblemSetSchema);
module.exports = ProblemSet;
