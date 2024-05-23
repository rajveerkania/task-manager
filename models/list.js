const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },

  time: {
    type: Number,
    required: true,
  },

  user: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("List", listSchema);
