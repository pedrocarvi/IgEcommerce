import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import Category from "../Models/CategoryModel.js";

const categoryRoute = express.Router();

// Get all categories
categoryRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Category.countDocuments({ ...keyword });
    const categorys = await Category.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ categorys, page, pages: Math.ceil(count / pageSize) });
  })
);

// Admin get all categories without search and pagination
categoryRoute.get(
  "/all",
  asyncHandler(async (req, res) => {
    const categories = await Category.find({}).sort({ _id: -1 });
    res.json(categories);
  })
);

// Get a specific category
categoryRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404);
      throw new Error("Category not Found");
    }
  })
);

// Delete category (admin)
categoryRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      await category.remove();
      res.json({ message: "Categoria eliminada" });
    } else {
      res.status(404);
      throw new Error("Category not Found");
    }
  })
);

// Create category (admin)
categoryRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, description, image } = req.body;
    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      res.status(400);
      throw new Error("Category name already exist");
    } else {
      const category = new Category({
        name,
        description,
        image,
      });
      if (category) {
        const createdCategory = await category.save();
        res.status(201).json(createdCategory);
      } else {
        res.status(400);
        throw new Error("Invalid category data");
      }
    }
  })
);

// Update category
categoryRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, description, image } = req.body;
    const category = await Category.findById(req.params.id);
    if (category) {
      category.name = name || category.name;
      category.description = description || category.description;
      category.image = image || category.image;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  })
);

export default categoryRoute;
