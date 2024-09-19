import mongoose from "mongoose";

const safeModel = <T>(model: mongoose.Model<T>) => ({
    find: async (query: Partial<T>) => await model.find(query),
    updateMany: async (query: Partial<T>, data: Partial<T>) =>
        model.updateMany(query, data),
    create: async (data: Partial<T>) => await model.create(data),
});

