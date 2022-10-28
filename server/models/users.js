const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const moviesSchema = new Schema({ name: { type: String, required: true } });

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: {
      type: [moviesSchema],
      default: undefined,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
