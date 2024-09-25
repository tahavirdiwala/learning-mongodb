const productController = require("../controllers/product.controller");
const {
  getProduct,
  deleteProduct,
  getAggregateProducts,
} = require("../controllers/product.controller");
const productService = require("../services/product.service");
const router = require("express").Router();

router
  .route("/products")
  .post(productController.add)
  .get(productController.getAll);
// .get(getAggregateProducts)

router
  .route("/products/:id")
  .get(productController.get)
  .put(productController.edit)
  .delete(productController.delete);

module.exports = router;
