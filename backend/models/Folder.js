const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ["folder", "file"],
    required: true,
  },
  content: String, // for file
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
});

module.exports = mongoose.model("Folder", folderSchema);
