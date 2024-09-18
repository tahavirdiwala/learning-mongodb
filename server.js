require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const productRouter = require("./routes/product.router");
const userRouter = require("./routes/users.router");
// const profileRouter = require("./routes/profiles.router");
const cors = require("cors");
const ProductSchema = require("./models/products");
const User = require("./models/users");
// const Profiles = require("./models/profiles");
const Cars = require("./models/cars");
// const CustomerModel = require("./models/customer");
// const IdentifiersModel = require("./models/indentifier");

app.use(cors());
app.use(express.json());

const arr = [productRouter, userRouter];

arr.forEach((item) => {
  app.use("/api", item);
});

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await ProductSchema.createCollection().then(() => {
      console.log("collections are created");
    });
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("error =>", error);
  }
};

// one to one relationship

  run();

  async function run() {
    const cars = new Cars({
      make: "some material",
      model: "2421", 
    })
    const user = new User({
      email: "test@gmail.com",
      username: "test",
      cars: cars
    })
   
    //  await cars.save()
    //  await user.save()
  }

start();
