const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  if(!user) return res.status(404).json({error:'User not found'});
  res.json({ user });
});

router.put('/', auth, async (req, res) => {
  const { name } = req.body;
  const user = await User.findById(req.user.id);
  if(!user) return res.status(404).json({error:'User not found'});
  user.name = name || user.name;
  await user.save();
  res.json({ user: { id: user._id, name: user.name, email: user.email }});
});

module.exports = router;
