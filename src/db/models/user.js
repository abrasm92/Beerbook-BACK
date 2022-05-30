const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String },
  username: { type: String, unique: true },
  password: { type: String, minlength: 8, maxlength: 30 },
  email: { type: String, unique: true },
  image: { type: String, default: null },
  creations: [{ type: Schema.Types.ObjectId, ref: "Beer" }],
  favorites: [{ type: Schema.Types.ObjectId, ref: "Beer" }],
  age: { type: Date, default: null },
  country: { type: String, default: null },
  admin: { type: Boolean, default: false },
});

const User = model("User", userSchema, "users");

module.exports = User;
