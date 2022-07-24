const Category = require('../../models/Category');
const adminAuth = require('../../middleware/adminAuth');

const express = require('express');
const router = express.Router();

//
//
//
// Post one
router.post('/', adminAuth, async (req, res) => {
  const postItem = {
    category: req.body.category,
    main: req.body.main,
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
router.put('/:id', adminAuth, async (req, res) => {
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
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.json(category);
  } catch (error) {
    console.log(error);
  }
});
//
//
//
// Get all
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
