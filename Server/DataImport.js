import express from "express";
import User from './Models/UserModel.js'
import users from './data/users.js'
import Product from './Models/ProductModel.js'
import products from "./data/Products.js";
import asyncHandler from 'express-async-handler'


const importData = express.Router()

importData.post(
    "/user", 
    asyncHandler(async (req, res) => {
        await User.remove({})
        const importUser = await User.insertMany(users);
        res.send({ importUser })
    })
);

importData.post(
    "/products", 
    asyncHandler(async (req, res) => {
        await Product.remove({})
        const importProduct = await Product.insertMany(products);
        res.send({ importProduct }) 
    })
);

export default importData