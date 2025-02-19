const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "A Product must have a price"],
  },
  description: {
    type: String,
    required: [true, "A product must have a description."],
  },
  image: {
    type: String,
    // required: [true, "A product must have an image"],
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
