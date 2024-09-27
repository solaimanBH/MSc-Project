// routes/blogs.js
const router = require('express').Router()
const Blog = require('../models/Blog')

// Get all blog posts
router.get('/', async (_req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error });
  }
});

// Create a new blog post
router.post('/', async (req, res) => {
  const { title, content, author, tags, imageUrl } = req.body;

  // Validation
  if (!title || !content || !author) {
    return res.status(400).json({ message: 'Title, content, and author are required' });
  }

  const newBlog = new Blog({
    title,
    content,
    author,
    tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    imageUrl,
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
});

// Update an existing blog post
router.put('/:id', async (req, res) => {
  const { title, content, author, tags, imageUrl } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        author,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        imageUrl,
      },
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: 'Error updating blog', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json({ message: 'Blog post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
});


module.exports = router