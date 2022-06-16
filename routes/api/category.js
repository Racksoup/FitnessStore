const Category = require('../../models/Category');
const adminAuth = require('../../middleware/adminAuth');

const express = require('express');
const router = express.Router();

//
//
//
// Post one
router.post('/', adminAuth, async (req, res) => {
  console.log(req.body);

  try {
    const category = new Category({ category: req.body.category });
    await category.save();
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
router.get('/', adminAuth, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
