const { StatusCodes } = require("http-status-codes");
const ProductModel = require("../models/products");
const sendResponse = require("../common");

const addProduct = async (req, res) => {
  const { name, description, price } = req.body;

  const payload = { name, description, price };
  ProductModel.create(payload).then((_, error) => {
    if (error) {
      sendResponse(res, StatusCodes.BAD_REQUEST, "Failed to Created Product");
    } else {
      sendResponse(
        res,
        StatusCodes.CREATED,
        "Product Created Successfully",
        payload
      );
    }
  });
};

const getProducts = async (req, res) => {
  const { page = 1, size = 10 } = req.params;

  ProductModel.find()
    .limit(size * 1)
    .skip((page - 1) * size)
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
  const { name, price } = req.body;

  const payload = { name, price };

  ProductModel.findByIdAndUpdate(id, payload, options).then(
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

  ProductModel.findByIdAndDelete(id).then((response, err) => {
    if (err)
      sendResponse(res, StatusCodes.BAD_REQUEST, "Failed to Delete Product");
    else sendResponse(res, StatusCodes.OK, "Product Deleted Successfully");
  });
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
    const result = await ProductModel.aggregate([
    {
      $group: {
        _id: "$name",
        properties: {
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
        properties: "$properties",
      },
    },
  ]);

    sendResponse(res, StatusCodes.OK, "Product Fetched SuccessFully", result);

  } catch(err) {
    console.log(err);
    
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
