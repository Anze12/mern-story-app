const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: 'User already exists' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    res.json(user);
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;