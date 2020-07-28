const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true }
},{ _id : false });

const orderSchema = mongoose.Schema({
  datePlaced: { type: Date, required: true },
  products: [productSchema]
});

module.exports = mongoose.model("Order", orderSchema);
