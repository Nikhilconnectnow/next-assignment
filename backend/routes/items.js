const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Item = require('../models/Item');

// Create
router.post('/', auth, async (req, res) => {
  const { title, content, tags } = req.body;
  const item = new Item({ userId: req.user.id, title, content, tags });
  await item.save();
  res.json({ item });
});

// Read list with search & filter
router.get('/', auth, async (req, res) => {
  const { q, completed } = req.query;
  let filter = { userId: req.user.id };
  if(typeof completed !== 'undefined') filter.completed = completed === 'true';
  if(q) filter.$text = { $search: q };
  const items = await Item.find(filter).sort({ createdAt: -1 }).limit(200);
  res.json({ items });
});

// Read single
router.get('/:id', auth, async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id, userId: req.user.id });
  if(!item) return res.status(404).json({error:'Not found'});
  res.json({ item });
});

// Update
router.put('/:id', auth, async (req, res) => {
  const updates = req.body;
  updates.updatedAt = new Date();
  const item = await Item.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, updates, { new: true });
  if(!item) return res.status(404).json({error:'Not found'});
  res.json({ item });
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  await Item.deleteOne({ _id: req.params.id, userId: req.user.id });
  res.json({ success: true });
});

module.exports = router;
