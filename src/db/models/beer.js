const { Schema, model } = require("mongoose");

const beerSchema = new Schema({
  name: { type: String },
  brewery: { type: String },
  style: { type: String },
  degrees: { type: Number },
  IBU: { type: Number },
  country: { type: String },
  description: { type: String },
  image: { type: String },
  imageBackup: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Beer = model("Beer", beerSchema, "beers");

module.exports = Beer;
