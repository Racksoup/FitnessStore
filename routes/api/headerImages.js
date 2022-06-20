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
// Header Image Storage
const headerStorage = new GridFsStorage({
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
          bucketName: 'headerImages',
          //metadata: req.body,
        };
        resolve(fileInfo);
      });
    });
  },
});
const headerUpload = multer({ storage: headerStorage });
// Create a new mongodb connection and once connected save GridFSBucket 'headerImages' to headerBucket
const connect = mongoose.createConnection(db);
let headerBucket;
connect.once('open', () => {
  headerBucket = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: 'headerImages',
  });
});
// --- IMAGE STORAGE & DB CONNECTION ---
// --- IMAGE STORAGE & DB CONNECTION ---
//
//
//
// Read Image
router.get('/:filename', async (req, res) => {
  headerBucket.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'No files available',
      });
    }

    if (files[0].contentType === 'image/png' || files[0].contentType === 'image/jpeg') {
      headerBucket.openDownloadStreamByName(req.params.filename).pipe(res);
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
// Get all header images
router.get('/data', async (req, res) => {
  try {
    const items = await headerBucket.find().toArray();
    res.json(items);
  } catch (error) {
    console.log(error);
  }
});
//
//
//
// Delete one header image
router.delete('/:filename', adminAuth, async (req, res) => {
  try {
    const img = await headerBucket.find({ filename: req.params.filename }).toArray();
    await headerBucket.delete(img[0]._id);
    res.json(img);
  } catch (error) {
    console.error(error.message);
    res.status(500).send;
  }
});
//
//
//
// Post single heaer image
router.post('/', [adminAuth, headerUpload.single('file')], async (req, res) => {
  res.json(req.file);
});

module.exports = router;
