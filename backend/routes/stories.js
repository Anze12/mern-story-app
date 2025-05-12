const express = require('express');
const Story = require('../models/story');
const User = require('../models/user');

const router = express.Router();

// CREATE: New story
router.post('/create', async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const story = new Story({ title, content, author: userId });
    await story.save();
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create story' });
  }
});

// READ: Get all stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find().populate('author', 'username').sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stories' });
  }
});

// READ: Search stories by title
router.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const regex = new RegExp(query, 'i');
    const results = await Story.find({ title: regex }).populate('author', 'username');
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Search failed' });
  }
});

// UPDATE: Update a story
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    const updated = await Story.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update story' });
  }
});

// DELETE: Remove a story
router.delete('/:id', async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ message: 'Story not found' });

    // Remove this story from all users' libraries
    await User.updateMany(
      { library: story._id },
      { $pull: { library: story._id } }
    );

    res.json({ message: 'Story deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete story' });
  }
});

// FAVORITE: Add a story to user’s library
router.post('/favorite', async (req, res) => {
  const { userId, storyId } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { $addToSet: { library: storyId } });
    await Story.findByIdAndUpdate(storyId, { $addToSet: { favoritedBy: userId } });
    res.json({ message: 'Added to library' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add to library' });
  }
});

router.post('/:id/save', async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user.library.includes(req.params.id)) {
      user.library.push(req.params.id);
      await user.save();
    }
    res.json({ message: 'Story saved to library' });
  } catch (err) {
    res.status(500).json({ message: 'Could not save story' });
  }
});

// LIBRARY: Get all stories saved by a user
router.get('/library/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('library');
    res.json(user.library);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch library' });
  }
});

module.exports = router;
