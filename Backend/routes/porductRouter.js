const express = require("express");
const prodcutController = require("./../contorller/productController");
const authController = require("./../contorller/authController");

const router = express.Router();

// Product routes
router
  .route("/")
  .get(authController.protect, prodcutController.getAllProduct)
  .post(
    authController.protect,
    prodcutController.uploadProductImage, // Use the image upload middleware
    prodcutController.createProduct
  );

router
  .route("/:id")
  .get(prodcutController.getProduct)
  .patch(
    authController.protect,
    prodcutController.uploadProductImage, // Use the image upload middleware for updates
    prodcutController.updateProduct
  )
  .delete(authController.protect, prodcutController.deleteProduct);

module.exports = router;
