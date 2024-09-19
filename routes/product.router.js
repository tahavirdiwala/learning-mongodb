const { addProduct, getProducts, updateProduct, getProduct, deleteProduct, getAggregateProducts } = require("../controllers/product.controller");
const router = require("express").Router();

router.route("/products").post(addProduct)
.get(getProducts)
// .get(getAggregateProducts)

router.route("/products/:id")
.get(getProduct)
.put(updateProduct)
.delete(deleteProduct)

module.exports = router