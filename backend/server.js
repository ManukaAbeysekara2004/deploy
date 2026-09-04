const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const dns = require('dns');

// Configure DNS servers only in development or if needed
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
    console.warn("Could not set custom DNS servers:", e.message);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({ status: "OK", message: "StudyWithMe API Server is running" });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Success: MongoDB Connected! ✅"))
    .catch(err => console.error("Error: Could not connect to MongoDB", err));

// User Routes
app.use('/api/user', require('./routes/userRoutes'));

// Todo Routes
app.use('/api/todo', require('./routes/todoRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));