const express = require("express");

const ProductController = require("../controllers/products");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", ProductController.createProduct);

router.put("/:id", ProductController.updateProduct);

router.get("", ProductController.getProducts);

router.get("/:id", ProductController.getProduct);

router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
