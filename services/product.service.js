const ProductsModel = require("../models/products");
const ReviewModel = require("../models/review");

class ProductService {
  async addProduct(req) {
    return new Promise(async (resolve, reject) => {
      const review = await ReviewModel.create({
        content: "product is so good",
        rating: 4,
      });

      const review2 = await ReviewModel.create({
        content: "product is so ok",
        rating: 3,
      });

      await review.save();
      await review2.save();

      let temp = [];

      temp.push(review._id, review2._id);

      ProductsModel.create({ ...req.body, reviews: temp })
        .then(resolve)
        .catch(reject);
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
      // ProductsModel.aggregate([
      //   {
      //     $lookup: {
      //       from: "reviews",
      //       localField: "_id",
      //       foreignField: "productId",
      //       as: "reviews",
      //     },
      //   },
      //   {
      //     $skip: (page - 1) * size,
      //   },
      //   {
      //     $limit: size * 1,
      //   },
      // ])
      //   .then(resolve)
      //   .catch(reject);

      ProductsModel.find().populate("reviews").then(resolve).catch(reject);
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
