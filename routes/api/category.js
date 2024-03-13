const Category = require("../../models/Category");
const adminAuth = require("../../middleware/adminAuth");
const db = process.env.MONGOURI;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
//
//
// --- IMAGE STORAGE & DB CONNECTION ---
// --- IMAGE STORAGE & DB CONNECTION ---
// Product Image Storage
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "categoryImages",
          //metadata: req.body,
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// Create a new mongodb connection and once connected save GridFSBucket 'productImages' to productImageBucket,
const connect = mongoose.createConnection(db);
let imageBucket;
connect.once("open", () => {
  imageBucket = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "categoryImages",
  });
});
// --- IMAGE STORAGE & DB CONNECTION ---
// --- IMAGE STORAGE & DB CONNECTION ---
//
//
//
// Post one
router.post("/", [adminAuth, upload.single("file")], async (req, res) => {
  const postItem = {
    category: req.body.category,
    main: req.body.main,
    image_filename: req.file.filename,
  };
  if (req.body.mainID) {
    postItem.mainID = req.body.mainID;
  }

  try {
    const category = new Category(postItem);
    await category.save();
    res.json(category);
  } catch (error) {
    console.log(error);
  }
});
//
//
//
// Update Category
router.put("/:id", adminAuth, async (req, res) => {
  const postItem = {
    _id: req.body._id,
    category: req.body.category,
    main: req.body.main,
  };
  if (req.body.mainID) {
    postItem.mainID = req.body.mainID;
  }
  try {
    const category = await Category.findByIdAndUpdate(req.body._id, postItem);
    res.json(category);
  } catch (error) {
    console.log(error);
  }
});
//
//
//
// Delete one
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    const img = await imageBucket
      .find({ filename: category.image_filename })
      .toArray();
    await imageBucket.delete(img[0]._id);
    res.json(category);
  } catch (error) {
    console.log(error);
  }
});
//
//
//
// Get all
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
});
//
//
//
// --- IMAGES ---
// --- IMAGES ---
// Get
router.get("/image/:filename", async (req, res) => {
  imageBucket.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No files available",
      });
    }

    if (
      files[0].contentType === "image/png" ||
      files[0].contentType === "image/jpeg"
    ) {
      imageBucket.openDownloadStreamByName(req.params.filename).pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});
// --- IMAGES ---
// --- IMAGES ---

module.exports = router;
