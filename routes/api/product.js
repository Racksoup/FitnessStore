const Product = require("../../models/Product");
const Category = require("../../models/Category");
const adminAuth = require("../../middleware/adminAuth");
const db = process.env.MONGOURI;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
          bucketName: "productImages",
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
    bucketName: "productImages",
  });
});
// --- IMAGE STORAGE & DB CONNECTION ---
// --- IMAGE STORAGE & DB CONNECTION ---
//
//
//
// Create Product
router.post("/", [adminAuth, upload.array("file", 15)], async (req, res) => {
  const {
    name,
    category,
    price,
    highlight,
    brand,
    merchant,
    details,
    tech_details,
    about,
    main_file,
  } = req.body;
  const postItem = {
    name,
    category,
    price,
    highlight,
    brand,
    merchant,
  };
  postItem.details = JSON.parse(details);
  postItem.tech_details = JSON.parse(tech_details);
  postItem.about = JSON.parse(about);
  // Set one of the images as the main image
  const files = req.files.map((file) => {
    if (file.originalname === main_file) {
      let data = {
        main: true,
        filename: file.filename,
      };
      return data;
    } else {
      let data = {
        main: false,
        filename: file.filename,
      };
      return data;
    }
  });
  postItem.image_filenames = files;

  try {
    // create stripe product / price
    const stripeProduct = await stripe.products.create({
      name: postItem.name,
      metadata: {
        db_id: postItem._id,
      },
    });

    const stripePrice = await stripe.prices.create({
      currency: "cad",
      product: stripeProduct.id,
      unit_amount: postItem.price,
    });

    // create mongodb product
    postItem.stripe_product_id = stripeProduct.id;
    postItem.stripe_price_id = stripePrice.id;
    const product = new Product(postItem);
    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error, Cannot Post Product");
  }
});
//
//
//
// Update Product
router.put("/:id", [adminAuth, upload.array("file", 15)], async (req, res) => {
  const {
    brand,
    merchant,
    name,
    category,
    price,
    highlight,
    details,
    tech_details,
    about,
    newMain,
    image_filenames,
    stripe_price_id,
    stripe_product_id,
  } = req.body;
  const postItem = {
    brand,
    merchant,
    name,
    category,
    price,
    highlight,
    stripe_price_id,
    stripe_product_id,
  };
  postItem.details = JSON.parse(details);
  postItem.tech_details = JSON.parse(tech_details);
  postItem.about = JSON.parse(about);
  postItem.image_filenames = JSON.parse(image_filenames);

  // Check and delete old images
  try {
    const product = await Product.findOne({ _id: req.params.id });
    let images = [];
    product.image_filenames.map((a) => {
      let bool = false;
      postItem.image_filenames.map((b) => {
        if (a.filename === b.filename) {
          bool = true;
        }
      });
      if (!bool) {
        let x = imageBucket.find({ filename: a.filename }).toArray();
        images.push(x);
      }
    });

    Promise.all(images).then((results) => {
      results.map((result) => imageBucket.delete(result[0]._id));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error, Cannot Update Product");
  }

  // Check and set new file as main file
  const files = req.files.map((file) => {
    if (file.originalname === newMain) {
      let data = {
        main: true,
        filename: file.filename,
      };
      return data;
    } else {
      let data = {
        main: false,
        filename: file.filename,
      };
      return data;
    }
  });
  postItem.image_filenames = [...postItem.image_filenames, ...files];

  try {
    const product = await Product.findOne({ _id: req.params.id });

    // check if price or name changed, if they did update stripe product/price objects
    if (product.price != postItem.price) {
      // disable last price
      const stripePrice = await stripe.prices.update(product.stripe_price_id, {
        active: false,
      });
      // create new price
      const stripePrice2 = await stripe.prices.create({
        currency: "cad",
        product: postItem.stripe_product_id,
        unit_amount: postItem.price,
      });

      postItem.stripe_price_id = stripePrice2.id;
    }
    if (product.name != postItem.name) {
      const stripeProduct = await stripe.products.update(
        product.stripe_product_id,
        {
          name: postItem.name,
        }
      );
    }

    const product2 = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      postItem
    );
    await product2.save();
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error, Cannot Update Product");
  }
});
//
//
//
// Delete Product
router.delete("/:_id", adminAuth, async (req, res) => {
  try {
    // Need to delete Product, Images
    const product = await Product.findOneAndDelete({ _id: req.params._id });

    // delete images
    let images = [];
    product.image_filenames.map((obj) => {
      let x = imageBucket.find({ filename: obj.filename }).toArray();
      images.push(x);
    });
    Promise.all(images).then((results) => {
      results.map((result) => imageBucket.delete(result[0]._id));
    });

    // update stripe product as inactive
    const stripeProduct = await stripe.products.update(
      product.stripe_product_id,
      {
        active: false,
      }
    );

    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
//
//
// Getters
// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send;
  }
});
// Get Highlight Products
router.get("/highlight", async (req, res) => {
  try {
    const products = await Product.find({ highlight: true });
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send;
  }
});
// Get Products by Stripe IDs
router.post("/find-by-stripe-ids", async (req, res) => {
  const { products } = req.body;
  try {
    const resProducts = products.map(async (x) => {
      const product = await Product.findOne({ stripe_product_id: x });
      return product;
    });
    Promise.all(resProducts).then((x) => {
      res.json(x);
    });
  } catch (error) {
    console.log(error.message);
  }
});
// Get Product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send;
  }
});
// Get Products in Category
router.get("/category/:category", async (req, res) => {
  try {
    const product = await Product.find({ category: req.params.category });
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send;
  }
});
// Product Search
router.get("/search/:search", async (req, res) => {
  try {
    const res1 = await Product.find({
      name: { $regex: req.params.search, $options: "i" },
    });
    const res2 = await Category.find({
      category: { $regex: req.params.search, $options: "i" },
    });
    res.json({ products: res1, category: res2 });
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
