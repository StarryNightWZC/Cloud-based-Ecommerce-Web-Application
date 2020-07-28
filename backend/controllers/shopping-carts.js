const ShoppingCart = require("../models/shopping-cart");

exports.createShoppingCart = (req, res, next) => {
  const shoppingCart = new ShoppingCart({
    dateCreated: req.body.dateCreated,
    products: undefined
  });
  shoppingCart
    .save()
    .then(createdShoppingCart => {
      res.status(201).json({
        message: "ShoppingCart added successfully",
        shoppingCart: {
          ...createdShoppingCart,
          id: createdShoppingCart._id
        }
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Creating a shoppingCart failed!"
      });
    });
};

exports.updateShoppingCart = (req, res, next) => {
  ShoppingCart.findOne({
    "_id": req.params.id,
    'products': {
      $elemMatch: {
          'key': req.body.product.id
      }
    }
  })
  .then(doc => {
    if(doc) {
      ShoppingCart.updateOne(
        {
          "_id": req.params.id,
          "products.key": req.body.product.id
        },
        { $set: { "products.$.quantity": req.body.product.quantity }}
      ).then(result => {
        if (result.n > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't udpate shoppingCart!"
        });
      });
    } else {
      ShoppingCart.updateOne(
        {
          "_id": req.params.id,
        },
        {
          $push: {
            "products": {
              "key": req.body.product.id,
              "title": req.body.product.title,
              "price": req.body.product.price,
              "category": req.body.product.category,
              "imageUrl": req.body.product.imageUrl,
              "quantity": req.body.product.quantity
            }
          }
        }
      ).then(result => {
        if (result.n > 0) {
          res.status(200).json({ message: "Update successful!!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Couldn't udpate shoppingCart!"
        });
      });
    }
  })

  // ShoppingCart.findOneAndUpdate(
  //   { "_id": req.params.id, "products._id": req.body.product.id },
  //   { $set: {
  //     "products.$.quantity": req.body.product.quantity }},
  //   { "upsert": true, "new": true  })
  //   .then(result => {
  //     // if (result.n > 0) {
  //     //   res.status(200).json({ message: "Update successful!" });
  //     // } else {
  //     //   res.status(401).json({ message: "Not authorized!" });
  //     // }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     res.status(500).json({
  //       message: "Couldn't udpate shoppingCart!"
  //     });
  //   });
};

// exports.getShoppingCarts = (req, res, next) => {
//   const shoppingCartQuery = ShoppingCart.find();
//   let fetchedShoppingCarts;
//   shoppingCartQuery
//     .then(documents => {
//       fetchedShoppingCarts = documents;
//       return ShoppingCart.count();
//     })
//     .then(count => {
//       res.status(200).json({
//         message: "ShoppingCarts fetched successfully!",
//         shoppingCarts: fetchedShoppingCarts,
//         maxShoppingCarts: count
//       });
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Fetching shoppingCarts failed!"
//       });
//     });
// };

exports.getShoppingCart = (req, res, next) => {
  ShoppingCart.findById(req.params.id)
    .then(shoppingCart => {
      if (shoppingCart) {
        res.status(200).json(shoppingCart);
      } else {
        res.status(404).json({ message: "ShoppingCart not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching shoppingCart failed!"
      });
    });
};

exports.getShoppingCartItem = (req, res, next) => {
  ShoppingCart.findById(req.params.id)
    .then(shoppingCart => {
      if (shoppingCart) {
        const item = shoppingCart.products.filter(product => {
          return product.key === req.params.productId;
        }).pop();
        if (item) {
          res.status(200).json(item);
        } else {
          res.status(200).json({ quantity: 0 });
        }
      } else {
        res.status(404).json({ message: "ShoppingCart not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching shoppingCartItem failed!"
      });
    });
};

exports.deleteShoppingCart = (req, res, next) => {
  // ShoppingCart.deleteOne({ _id: req.params.id })
  //   .then(result => {
  //     if (result.n > 0) {
  //       res.status(200).json({ message: "Deletion successful!" });
  //     } else {
  //       res.status(401).json({ message: "Not authorized!" });
  //     }
  //   })
  //   .catch(error => {
  //     res.status(500).json({
  //       message: "Deleting shoppingCart failed!"
  //     });
  //   });
  ShoppingCart.updateOne(
    {
      "_id": req.params.id,
    },
    { $set: { "products": [] }})
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Deleting shoppingCartItem failed!"
      });
    });
};

exports.deleteShoppingCartItem = (req, res, next) => {
  ShoppingCart.updateOne(
    {
      "_id": req.params.id,
    },
    { $pull: { "products": { "key": req.params.productId } }})
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Deleting shoppingCartItem failed!"
      });
    });
};
