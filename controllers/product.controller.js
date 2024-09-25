const { StatusCodes } = require("http-status-codes");
const ProductModel = require("../models/products");
const sendResponse = require("../common");
const productService = require("../services/product.service");

class ProductController {
  async add(req, res) {
    try {
      const product = await productService.addProduct(req);
      sendResponse(
        res,
        StatusCodes.CREATED,
        "Product Added SuccessFully",
        product
      );
    } catch (err) {
      sendResponse(res, StatusCodes.BAD_REQUEST, err.message);
    }
  }

  async getAll(req, res) {
    try {
      const products = await productService.getProducts(req);
      sendResponse(
        res,
        StatusCodes.OK,
        "Product Fetched SuccessFully",
        products
      );
    } catch (err) {
      sendResponse(res, StatusCodes.BAD_REQUEST, err.message);
    }
  }

  async get(req, res) {
    try {
      const product = await productService.getProduct(req);

      sendResponse(
        res,
        StatusCodes.OK,
        "Product Fetched Successfully",
        product
      );
    } catch (err) {
      sendResponse(res, StatusCodes.BAD_REQUEST, err.message);
    }
  }

  async edit(req, res) {
    try {
      const product = await productService.updateProduct(req);
      sendResponse(
        res,
        StatusCodes.OK,
        "Product Updated Successfully",
        product
      );
    } catch (err) {
      sendResponse(res, StatusCodes.BAD_REQUEST, err.message);
    }
  }

  async delete(req, res) {
    try {
      productService.deleteProduct(req).then(() => {
        sendResponse(res, StatusCodes.OK, "Product Deleted Successfully");
      });
    } catch (err) {
      sendResponse(res, StatusCodes.BAD_REQUEST, "Failed to Delete Product");
    }
  }
}

// aggregation pipeline example
const getAggregateProducts = async (req, res) => {
  // const result = await ProductModel.aggregate([
  //   {
  //     $match: {price: {$lt: 44}} // it works like find function with filter specification
  //   },
  //   {
  //     $group: { _id: "$name" },
  //   },
  //   {
  //     $project: {
  //       name: "$_id",
  //       _id: false,
  //     },
  //   },
  // ]);

  try {
    // const result = await ProductModel.aggregate([
    //   {
    //     $group: {
    //       _id: "$name",
    //       properties: {
    //         $push: {
    //           name: "$name",
    //           price: "$price",
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       name: "$_id",
    //       _id: false,
    //       properties: "$properties",
    //     },
    //   },
    // ]);

    const result = await ProductModel.aggregate([
      {
        $group: {
          _id: "$name",
          temp: {
            $push: {
              name: "$name",
              price: "$price",
            },
          },
        },
      },
      {
        $project: {
          name: "$_id",
          _id: false,
          temp: "$temp",
        },
      },
    ]);

    sendResponse(res, StatusCodes.OK, "Product Fetched SuccessFully", result);
  } catch (err) {
    sendResponse(res, StatusCodes.BAD_REQUEST, err.message);
  }
};

module.exports = new ProductController();
