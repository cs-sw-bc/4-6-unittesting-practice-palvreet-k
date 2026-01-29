// Parking Routes - API endpoints for parking operations

import express from 'express';
import * as parkingController from '../controllers/parkingController.js';

const router = express.Router();

// Create a new parking session (vehicle enters)
router.post('/session/enter', parkingController.createSession);

// Exit parking and calculate bill
router.post('/session/:sessionId/exit', parkingController.exitParking);

// Get a specific session
router.get('/session/:sessionId', parkingController.getSession);

// Get all sessions
router.get('/sessions', parkingController.getAllSessions);

// Clear all sessions (testing utility)
router.post('/admin/clear', parkingController.clearSessions);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'parking-lot-billing-system' });
});

export default router;
