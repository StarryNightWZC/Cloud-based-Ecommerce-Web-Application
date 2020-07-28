const express = require("express");

const OrderController = require("../controllers/orders");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, OrderController.createOrder);

router.get("", checkAuth, OrderController.getOrders);

router.get("/:id", checkAuth, OrderController.getOrder);

module.exports = router;
