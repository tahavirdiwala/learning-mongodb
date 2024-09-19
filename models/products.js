const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      min: 4,
      max: 80,
      index: true,
    },
    description: {
      type: String,
      require: false,
      trim: true,
      lowercase: true,
      min: 4,
      max: 150,
      index: true,
    },
    price: {
      type: Number,
      require: false,
      min: [5, "very less"],
      index: true,
    },
  },
  { 
    timestamps: true,
    // toObject: {virtuals:true},
    // toJSON: {virtuals:true},
}
);

// virtual example
// productSchema.virtual("productPrice").get(function(){
//   return this.price * 2;
// }) 

// mongoose middleware examples
// productSchema.pre("find", function () {
//   console.log('pre');
// })

// productSchema.post("find", function () {
//   console.log('post');
// })

// productSchema.pre("findOneAndDelete", function(){
//   console.log('product deleted');
// })

// productSchema.pre("findOneAndUpdate", function() {
//   console.log('product updated');
// })

const ProductsModel = mongoose.model("Products", productSchema);
module.exports = ProductsModel;