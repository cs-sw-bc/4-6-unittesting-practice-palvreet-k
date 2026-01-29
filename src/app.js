// Express Application - Main app configuration

import express from 'express';
import parkingRoutes from './routes/parkingRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/parking', parkingRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

export default app;

// Request comes in
//     ↓
// Parse data (middleware)
//     ↓
// Log the request (middleware)
//     ↓
// Check if route exists
//     ↓
// If yes → Run the route handler
// If no → Send 404
//     ↓
// If error → Send 500
//     ↓
// Send response back
