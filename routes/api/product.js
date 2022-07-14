const Product = require('../../models/Product');
const adminAuth = require('../../middleware/adminAuth');
const db = process.env.MONGOURI;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
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
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'productImages',
          //metadata: req.body,
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
// Extra Product Image Storage
const extraStorage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'extraProductImages',
          metadata: { productID: req.params.productID, imgName: file.originalname },
        };
        resolve(fileInfo);
      });
    });
  },
});
const extraUpload = multer({ storage: extraStorage });
// Create a new mongodb connection and once connected save GridFSBucket 'headerImages' to headerImageBucket, 'contentImages' to contentImageBucket
const connect = mongoose.createConnection(db);
let imageBucket;
let extraImageBucket;
connect.once('open', () => {
  imageBucket = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: 'productImages',
  });
  extraImageBucket = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: 'extraProductImages',
  });
});
// --- IMAGE STORAGE & DB CONNECTION ---
// --- IMAGE STORAGE & DB CONNECTION ---
//
//
//
// Create Product
router.post('/', [adminAuth, upload.array('file', 15)], async (req, res) => {
  console.log(req.files);
  const { name, category, price, details, tech_details, about, main_file } = req.body;
  const postItem = {
    name,
    category,
    price,
  };
  postItem.details = JSON.parse(details);
  postItem.tech_details = JSON.parse(tech_details);
  postItem.about = JSON.parse(about);
  // Set one of the images as the main image
  const files = req.files.map((file) => {
    console.log(file.originalname, main_file);
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
    const product = new Product(postItem);
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error, Cannot Post Product');
  }
});
//
//
//
// Update Product
router.put('/:id', [adminAuth, upload.single('file')], async (req, res) => {
  const { name, description, category, price, details, image_filename } = req.body;
  const postItem = {
    name,
    description,
    category,
    price,
    image_filename,
  };
  if (details) {
    postItem.details = JSON.parse(details);
  }
  if (req.file) {
    postItem.image_filename = req.file.filename;
  }

  try {
    const product = await Product.findByIdAndUpdate({ _id: req.params.id }, postItem, {
      new: true,
    });
    // primary image is already uploaded. so if it was, delete the old one.
    if (req.file) {
      const x = await imageBucket.find({ filename: image_filename }).toArray();
      await imageBucket.delete(x[0]._id);
    }
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error, Cannot Post Product');
  }
});
//
//
//
// Delete Product
router.delete('/:_id', adminAuth, async (req, res) => {
  try {
    // Need to delete Product, primary image and all extra images
    const product = await Product.findOneAndDelete({ _id: req.params._id });
    const image = await imageBucket.find({ filename: product.image_filename }).toArray();
    await imageBucket.delete(image[0]._id);
    const extraImgs = await extraImageBucket
      .find({ 'metadata.productID': req.params._id })
      .toArray();
    extraImgs.map(async (img) => {
      await extraImageBucket.delete(img._id);
    });
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
//
//
// Getters
// Get Product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send;
  }
});
// Get All Items
router.get('/', async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send;
  }
});
// Get Products in Category
router.get('/category/:category', async (req, res) => {
  try {
    const product = await Product.find({ category: req.params.category });
    res.json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send;
  }
});
// Product Search
router.get('/search/:search', async (req, res) => {
  try {
    const res1 = await Blog.find({ name: { $regex: req.params.search, $options: 'i' } });
    const res2 = await Blog.find({ category: { $regex: req.params.search, $options: 'i' } });
    res.json([res1, res2]);
  } catch (error) {
    console.log(error);
  }
});
//
//
//
// --- PRIMARY IMAGES ---
// --- PRIMARY IMAGES ---
// Get
router.get('/primary-image/:filename', async (req, res) => {
  imageBucket.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'No files available',
      });
    }

    if (files[0].contentType === 'image/png' || files[0].contentType === 'image/jpeg') {
      imageBucket.openDownloadStreamByName(req.params.filename).pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image',
      });
    }
  });
});
// --- PRIMARY IMAGES ---
// --- PRIMARY IMAGES ---
//
//
//
// --- EXTRA IMAGES ---
// --- EXTRA IMAGES ---
// Get
router.get('/extra-image/:filename', async (req, res) => {
  extraImageBucket.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'No files available',
      });
    }

    if (files[0].contentType === 'image/png' || files[0].contentType === 'image/jpeg') {
      extraImageBucket.openDownloadStreamByName(req.params.filename).pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image',
      });
    }
  });
});
//
//
//
// Get all extra images data for one product
router.get('/extra-images/data/:productID', async (req, res) => {
  try {
    const items = await extraImageBucket
      .find({ 'metadata.productID': req.params.productID })
      .toArray();
    res.json(items);
  } catch (error) {
    console.log(error);
  }
});
//
//
//
// Delete one product extra image
router.delete('/extra-image/:filename', adminAuth, async (req, res) => {
  try {
    const img = await extraImageBucket.find({ filename: req.params.filename }).toArray();
    await extraImageBucket.delete(img[0]._id);
    res.json(img);
  } catch (error) {
    console.error(error.message);
    res.status(500).send;
  }
});
//
//
//
// Post content-images
router.post(
  '/extra-images/:productID',
  [adminAuth, extraUpload.array('file', 100)],
  async (req, res) => {
    res.json(req.files);
  }
);
//
//
//
// Post single content-image
router.post(
  '/extra-image/:productID',
  [adminAuth, extraUpload.single('file')],
  async (req, res) => {
    res.json(req.file);
  }
);
//
//
//
// Update metadata.imgName
router.put('/extra-image/name/:filename/:name/:productID', adminAuth, async (req, res) => {
  const postItem = {
    $set: { metadata: { imgName: req.params.name, productID: req.params.productID } },
  };
  try {
    let x = mongoose.connection.db.collection('extraProductImages.files');
    const newImage = await x.findOneAndUpdate({ filename: req.params.filename }, postItem, {
      new: true,
    });
    res.json(newImage);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
