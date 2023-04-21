const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name is required"], trim: true },
  date: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);
