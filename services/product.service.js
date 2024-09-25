const ProductsModel = require("../models/products");

class ProductService {
  async addProduct(req) {
    return new Promise((resolve, reject) => {
      ProductsModel.create(req.body).then(resolve).catch(reject);
    });
  }

  async getProducts(req) {
    //#region - body
    const { page = 1, size = 10 } = req.params;
    const filters = {
      name: "some filter",
      price: 22,
    };
    //#endregion - body

    //#region - selectors
    const selectors = {
      name: 1,
      price: 1,
    };
    //#endregion - selectors

    //#region - queries
    return new Promise((resolve, reject) => {
      ProductsModel.find()
        .skip((page - 1) * size)
        .limit(size * 1)
        .lean()
        .then(resolve)
        .catch(reject);
    });
    //#endregion - queries
  }

  async getProduct(req) {
    const id = req.param.id;

    return new Promise((resolve, reject) =>
      ProductsModel.findById(id).then(resolve).catch(reject)
    );
  }

  async updateProduct(req) {
    const id = req.params.id;
    const options = { new: true };

    return new Promise((resolve, reject) => {
      ProductsModel.findByIdAndUpdate(id, req.body, options)
        .then(resolve)
        .catch(reject);
    });
  }

  async deleteProduct(req) {
    const id = req.params.id;

    return new Promise((resolve, reject) => {
      ProductsModel.findByIdAndDelete(id).then(resolve).catch(reject);
    });
  }
}

module.exports = new ProductService();
