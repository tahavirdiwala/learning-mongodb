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
  const { page = 1, size = 10 } = req.params;

  const selectors = {
    name: 1,
    price: 1,
  };

  ProductModel.find()
    .skip((page - 1) * size)
    .limit(size * 1)
    .lean()
    // .select(selectors)
    .then((response, error) => {
      if (error) {
        sendResponse(
          res,
          StatusCodes.BAD_REQUEST,
          "Failed to Fetched Products"
        );
      } else {
        sendResponse(
          res,
          StatusCodes.OK,
          "Products Fetched Successfully",
          response
        );
      }
    });
};

const updateProduct = async (req, res) => {
  const id = req.params.id;

  const options = { new: true };

  ProductModel.findByIdAndUpdate(id, req.body, options).then(
    (response, error) => {
      if (error)
        sendResponse(res, StatusCodes.BAD_REQUEST, "Failed to Update Product");
      else {
        sendResponse(
          res,
          StatusCodes.OK,
          "Products Updated Successfully",
          response
        );
      }
    }
  );
};

const getProduct = async (req, res) => {
  const id = req.param.id;

  ProductModel.findById(id).then((response) => {
    if (error)
      sendResponse(res, StatusCodes.BAD_REQUEST, "Failed to Fetched Product");
    else {
      sendResponse(
        res,
        StatusCodes.OK,
        "Product Fetched Successfully",
        response
      );
    }
  });
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

    // const result = await ProductModel.aggregate([
    //   {
    //     $group: {
    //       _id: "$name",
    //       temp: {
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
    //       temp: "$temp",
    //     },
    //   },
    // ]);


    const result = await ProductModel.aggregate([
      {
        $group: {
          _id: "$name",
          temp: {
            $push: "$$ROOT"
          }
        }
      }, {
        $project: {
          _id: 0,
          temp: 1
        }
      }
    ])

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
