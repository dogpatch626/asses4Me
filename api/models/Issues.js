const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Issue = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  upvote: {
    type: Number,
  },
  downvote: {
    type: Number,
  },
  userID: {
    type: String,
  },
  comments: {
    type: Array,
  },
  voted: {
    type: Array,
  },
});

module.exports = mongoose.model("Issue", Issue);
