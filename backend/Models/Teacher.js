const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  students: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [], // Initialize students as an empty array
  },
});

// Pre-save hook to remove duplicates

module.exports = mongoose.model("Teacher", teacherSchema);
