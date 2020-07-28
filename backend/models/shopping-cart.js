const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  key: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  quantity: { type: Number, required: true }
},{ _id : false });

const shoppingCartSchema = mongoose.Schema({
  dateCreated: { type: Date, required: true },
  products: [productSchema]
});

module.exports = mongoose.model("ShoppingCart", shoppingCartSchema);
