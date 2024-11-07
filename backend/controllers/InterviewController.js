const ProblemSet = require("../models/ProblemSet");

const getAllProblemSets = async (req, res) => {
  try {
    // Fetch all problem sets from the database
    const problemSets = await ProblemSet.find();

    // Return the problem sets as a JSON response
    res.status(200).json(problemSets);
  } catch (error) {
    console.error("Error fetching problem sets:", error);
    res
      .status(500)
      .json({ message: "Server error, could not fetch problem sets" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id, type } = req.query;
    console.log(id, type);
    if (!id || !type) {
      return res.status(400).json({ message: "Missing id or type in query" });
    }

    // Define the update field based on the 'type' query parameter
    let updateField = {};
    if (type === "done") {
      // Toggle the completionStatus field
      const problem = await ProblemSet.findById(id);
      if (!problem) {
        return res.status(404).json({ message: "Problem not found" });
      }
      updateField = { completionStatus: !problem.completionStatus };
    } else if (type === "revision") {
      // Toggle the revisionMark field
      const problem = await ProblemSet.findById(id);
      if (!problem) {
        return res.status(404).json({ message: "Problem not found" });
      }
      updateField = { revisionMark: !problem.revisionMark };
    } else {
      return res.status(400).json({
        message: "Invalid 'type' query parameter. Use 'done' or 'revision'",
      });
    }

    // Update the specific field based on type
    const updatedProblem = await ProblemSet.findByIdAndUpdate(
      id,
      updateField,
      { new: true } // Return the updated document
    );

    if (!updatedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Return the updated problem as a response
    res.status(200).json(updatedProblem);
  } catch (error) {
    console.error("Error updating problem status:", error);
    res
      .status(500)
      .json({ message: "Server error, could not update problem status" });
  }
};

module.exports = { getAllProblemSets, updateStatus };
