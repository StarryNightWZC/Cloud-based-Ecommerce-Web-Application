const express = require("express");

const ShoppingCartController = require("../controllers/shopping-carts");

const router = express.Router();

router.post("", ShoppingCartController.createShoppingCart);

router.put("/:id", ShoppingCartController.updateShoppingCart);

// router.get("", ShoppingCartController.getShoppingCarts);

router.get("/:id/:productId", ShoppingCartController.getShoppingCartItem);

router.get("/:id", ShoppingCartController.getShoppingCart);

router.delete("/:id/:productId", ShoppingCartController.deleteShoppingCartItem);

router.delete("/:id", ShoppingCartController.deleteShoppingCart);

module.exports = router;
