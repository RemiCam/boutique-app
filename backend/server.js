const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allow all origins for development
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Glacier Gear API is running' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => { // ← '0.0.0.0' allows external connections
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`For mobile testing, use your IP: http://YOUR_IP:${PORT}`);
});