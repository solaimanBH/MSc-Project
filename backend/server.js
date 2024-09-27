const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');
const seed = require('./seeds/user.seed');
const app = express();
const port = process.env.PORT || 5000;

const posts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' }
];

connectDB()

seed()

app.use(cors())
app.use(express.json())

app.use('/api', require('./routers/index.router'))
app.use('/api/auth', require('./routers/auth.router'))
app.use('/api/projects', require('./routers/project.router'))
app.use('/api/tasks', require('./routers/task.router'))
app.use('/api/donations', require('./routers/donation.router'))
app.use('/api/dashboard', require('./routers/dashboard.router'))
app.use('/api/volunteers', require('./routers/volunteer.router'))
app.use('/api/blog', require('./routers/blog.router'))

app.get('/api/posts', (_req, res) => {
  res.json(posts);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
