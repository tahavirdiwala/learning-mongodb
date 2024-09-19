import mongoose from "mongoose";
import ProductsModel from "./models/products";

const safeModel = <T>(model: mongoose.Model<T>) => ({
    find: async (query: Partial<T>) => await model.find(query),
    updateMany: async (query: Partial<T>, data: Partial<T>) =>
        model.updateMany(query, data),
    create: async (data: Partial<T>) => await model.create(data),
});

console.log('safeModel', safeModel(ProductsModel));
