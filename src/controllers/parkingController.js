// Parking Controller - Handles request/response for parking operations

import * as ParkingModel from '../models/parkingModel.js';

// In-memory storage for parking sessions
const parkingSessions = new Map();
let sessionCounter = 1;

/**
 * Creates a new parking session when a vehicle enters
 */
export function createSession(req, res) {
  const sessionId = sessionCounter++;
  const entryTime = new Date();
  
  parkingSessions.set(sessionId, {
    sessionId,
    vehicleId: req.body.vehicleId || `VEHICLE_${sessionId}`,
    entryTime,
    exitTime: null,
    status: 'ACTIVE'
  });
  
  res.json({
    success: true,
    sessionId,
    message: 'Parking session started',
    entryTime
  });
}

/**
 * Calculates bill when vehicle exits
 */
export function exitParking(req, res) {
  const { sessionId } = req.params;
  const { isLostTicket = false, promoCode = null } = req.body;
  
  const session = parkingSessions.get(parseInt(sessionId));
  
  if (!session) {
    return res.status(404).json({
      success: false,
      message: 'Session not found'
    });
  }
  
  const exitTime = new Date();
  session.exitTime = exitTime;
  session.status = 'COMPLETED';
  
  // Calculate the bill using the model
  const bill = ParkingModel.calculateParkingBill(session.entryTime, exitTime, {
    isLostTicket,
    promoCode
  });
  
  res.json({
    success: true,
    sessionId,
    vehicleId: session.vehicleId,
    bill,
    formattedAmount: ParkingModel.formatCurrency(bill.finalAmount)
  });
}

/**
 * Retrieves details of a specific parking session
 */
export function getSession(req, res) {
  const { sessionId } = req.params;
  const session = parkingSessions.get(parseInt(sessionId));
  
  if (!session) {
    return res.status(404).json({
      success: false,
      message: 'Session not found'
    });
  }
  
  res.json({
    success: true,
    session
  });
}

/**
 * Lists all active and completed sessions
 */
export function getAllSessions(req, res) {
  const sessions = Array.from(parkingSessions.values());
  
  res.json({
    success: true,
    total: sessions.length,
    sessions
  });
}

/**
 * Clears all sessions (for testing purposes)
 */
export function clearSessions(req, res) {
  parkingSessions.clear();
  sessionCounter = 1;
  
  res.json({
    success: true,
    message: 'All sessions cleared'
  });
}
