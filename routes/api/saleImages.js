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
// Sale Image Storage
const saleStorage = new GridFsStorage({
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
          bucketName: 'saleImages',
          //metadata: req.body,
        };
        resolve(fileInfo);
      });
    });
  },
});
const saleUpload = multer({ storage: saleStorage });
// Create a new mongodb connection and once connected save GridFSBucket 'saleImages' to saleBucket
const connect = mongoose.createConnection(db);
let saleBucket;
connect.once('open', () => {
  saleBucket = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: 'saleImages',
  });
});
// --- IMAGE STORAGE & DB CONNECTION ---
// --- IMAGE STORAGE & DB CONNECTION ---
//
//
//
// Read Image
router.get('/:filename', async (req, res) => {
  saleBucket.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'No files available',
      });
    }

    if (files[0].contentType === 'image/png' || files[0].contentType === 'image/jpeg') {
      saleBucket.openDownloadStreamByName(req.params.filename).pipe(res);
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
// Get all sale images
router.get('/data', async (req, res) => {
  try {
    const items = await saleBucket.find().toArray();
    res.json(items);
  } catch (error) {
    console.log(error);
  }
});
//
//
//
// Delete one sale image
router.delete('/:filename', adminAuth, async (req, res) => {
  try {
    const img = await saleBucket.find({ filename: req.params.filename }).toArray();
    await saleBucket.delete(img[0]._id);
    res.json(img);
  } catch (error) {
    console.error(error.message);
    res.status(500).send;
  }
});
//
//
//
// Post single sale image
router.post('/', [adminAuth, saleUpload.single('file')], async (req, res) => {
  res.json(req.file);
});

module.exports = router;
