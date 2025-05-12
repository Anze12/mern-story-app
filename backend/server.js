const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const storyRoutes = require('./routes/stories');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));