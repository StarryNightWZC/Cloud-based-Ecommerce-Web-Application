const mongoose = require("mongoose");
const ShoppingCart = require("./models/shopping-cart");

async function connect(io) {
  await mongoose
    .connect(
      "mongodb+srv://arthur:" +
        process.env.MONGO_ATLAS_PW +
        "@cluster0.t24fe.mongodb.net/node-angular?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to database!");
    })
    .catch(() => {
      console.log("Connection failed!");
    });
  const ShoppingCartChangeStream = ShoppingCart.collection.watch({
    fullDocument: 'updateLookup',
  });
  ShoppingCartChangeStream.on("change", result => {
    // console.log(result);
    io.emit("cartChangeEvent", {
      type: result.operationType,
      fullDocument: result.fullDocument
    });
  });

}
exports.connect = connect;
