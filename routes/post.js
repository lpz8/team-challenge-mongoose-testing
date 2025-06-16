const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// POST /posts/create
router.post('/create', async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({ title, body });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /posts/id/:_id
router.get('/id/:_id', async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /posts/title/:title
router.get('/title/:title', async (req, res) => {
  try {
    const posts = await Post.find({ title: req.params.title });
    if (!posts.length) return res.status(404).json({ message: 'No se encontraron publicaciones con ese título' });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /posts/id/:_id
router.put('/id/:_id', async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = await Post.findByIdAndUpdate(req.params._id, { title, body }, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /posts/id/:_id
router.delete('/id/:_id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params._id);
    if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });
    res.json({ message: 'Publicación eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// EXTRA: GET /posts/postsWithPagination
router.get('/postsWithPagination', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const posts = await Post.find().skip(skip).limit(limit);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;