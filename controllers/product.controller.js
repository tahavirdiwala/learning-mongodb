const { StatusCodes } = require("http-status-codes");
const ProductModel = require("../models/products");
const sendResponse = require("../common");

const addProduct = async (req, res) => {
  try {
    ProductModel.create(req.body).then((resp) => {
      sendResponse(res, StatusCodes.OK, "Products Added SuccessFully", resp);
    });
  } catch (err) {
    sendResponse(res, StatusCodes.BAD_GATEWAY, err.message);
  }
};

const getProducts = async (req, res) => {
  try {
    //#region - body
    const { page = 1, size = 10 } = req.params;
    //#endregion - body

    //#region - filters
    const filters = {
      name: "some filter",
      price: 22,
    };
    //#endregion - filters

    //#region - selectors
    const selectors = {
      name: 1,
      price: 1,
    };
    //#endregion - selectors

    //#region - queries
    ProductModel.find()
      .skip((page - 1) * size)
      .limit(size * 1)
      .lean()
      // .select(selectors)
      .then((response) => {
        sendResponse(
          res,
          StatusCodes.OK,
          "Products Fetched Successfully",
          response
        );
      });
    //#endregion - queries
  } catch (err) {
    //#region - error
    sendResponse(res, StatusCodes.BAD_REQUEST, err.message);
    //#endregion - error
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const options = { new: true };

    ProductModel.findByIdAndUpdate(id, req.body, options).then((response) => {
      sendResponse(
        res,
        StatusCodes.OK,
        "Products Updated Successfully",
        response
      );
    });
  } catch (err) {
    sendResponse(res, StatusCodes.BAD_REQUEST, "Failed to Update Product");
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.param.id;

    ProductModel.findById(id).then((response) => {
      sendResponse(
        res,
        StatusCodes.OK,
        "Product Fetched Successfully",
        response
      );
    });
  } catch (err) {
    sendResponse(res, StatusCodes.BAD_REQUEST, err.message);
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    ProductModel.findByIdAndDelete(id).then(() => {
      sendResponse(res, StatusCodes.OK, "Product Deleted Successfully");
    });
  } catch (err) {
    sendResponse(res, StatusCodes.BAD_REQUEST, "Failed to Delete Product");
  }
};

//aggregation pipeline example
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

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  getProduct,
  deleteProduct,
  getAggregateProducts,
};
