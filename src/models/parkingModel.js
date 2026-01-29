// Parking Lot Billing System - Business Logic Model (ES Module)
// All functions are pure and synchronous for testability

const HOURLY_RATE = 5.00;
const MAX_DAILY_CHARGE = 20.00;
const LOST_TICKET_FEE = 25.00;
const TAX_RATE = 0.08;

/**
 * Calculates the parking duration in hours between entry and exit times.
 * @param {Date} entryTime - When the vehicle entered
 * @param {Date} exitTime - When the vehicle exited
 * @returns {number} Duration in hours (can be fractional)
 */
export function calculateParkingDuration(entryTime, exitTime) {
  const durationMs = exitTime - entryTime;
  const durationHours = durationMs / (1000 * 60 * 60);
  return durationHours;
}

/**
 * Calculates base parking fee based on hourly rate and duration.
 * @param {number} durationHours - Duration in hours
 * @returns {number} Base parking fee in dollars
 */
export function calculateBaseFee(durationHours) {
  const baseFee = durationHours * HOURLY_RATE;
  return baseFee;
}

/**
 * Rounds parking time up to the nearest billable hour.
 * For example: 2.1 hours → 3 hours, 2.0 hours → 2 hours
 * BUG PRESENT: This function has an off-by-one logic error
 * @param {number} durationHours - Duration in hours
 * @returns {number} Rounded billable hours
 */
export function roundToBillableHours(durationHours) {
  // BUG: Using floor instead of ceil will undercharge
  return Math.ceil(durationHours);
}

/**
 * Applies the maximum daily parking charge cap.
 * If the charge exceeds the maximum, it's capped at that value.
 * @param {number} fee - The calculated fee
 * @returns {number} Fee after applying the daily maximum cap
 */
export function applyMaximumDailyCap(fee) {
  return Math.min(fee, MAX_DAILY_CHARGE);
}

/**
 * Applies the lost ticket fee as a flat surcharge.
 * @param {number} fee - The current fee
 * @param {boolean} isLostTicket - Whether the ticket was lost
 * @returns {number} Fee after applying lost ticket surcharge if applicable
 */
export function applyLostTicketFee(fee, isLostTicket) {
  if (isLostTicket) {
    return fee + LOST_TICKET_FEE;
  }
  return fee;
}

/**
 * Applies a promotional discount code to the fee.
 * Valid codes: 'SAVE10' (10% off), 'SAVE5' (5% off)
 * BUG PRESENT: Discount calculation happens before other fees are finalized
 * @param {number} fee - The current fee
 * @param {string} promoCode - The promotional code (or null/empty)
 * @returns {number} Fee after applying discount
 */
export function applyPromoCode(fee, promoCode) {
  let discount = 0;
  
  if (promoCode === 'SAVE10') {
    discount = fee * 0.10;
  } else if (promoCode === 'SAVE5') {
    discount = fee * 0.05;
  }
  
  const discountedFee = fee - discount;
  // BUG: Returns the discounted amount, but the discount should not apply
  // to the maximum daily cap (it should be applied only to base fee)
  return discountedFee;
}

/**
 * Calculates the final amount payable including tax.
 * BUG PRESENT: Tax calculation is incorrect - applied to wrong amount
 * @param {number} subtotal - The subtotal before tax
 * @returns {number} Final amount with tax, rounded to 2 decimal places
 */
export function calculateFinalAmount(subtotal) {
  // BUG: Tax is being calculated on the subtotal and then added,
  // but should include tax before subtracting discounts were applied.
  // This creates an edge case where tax is computed incorrectly
  const tax = subtotal * TAX_RATE;
  // BUG: Returning subtotal + tax directly causes wrong rounding in edge cases
  return parseFloat((subtotal + tax).toFixed(2));
}

/**
 * Complete billing calculation pipeline.
 * Orchestrates all functions to calculate final parking charge.
 * @param {Date} entryTime - Entry timestamp
 * @param {Date} exitTime - Exit timestamp
 * @param {Object} options - Options object
 * @param {boolean} options.isLostTicket - Whether ticket was lost
 * @param {string} options.promoCode - Promotional code if any
 * @returns {Object} Detailed breakdown of charges
 */
export function calculateParkingBill(entryTime, exitTime, options = {}) {
  const { isLostTicket = false, promoCode = null } = options;
  
  const duration = calculateParkingDuration(entryTime, exitTime);
  const billableHours = roundToBillableHours(duration);
  const baseFee = calculateBaseFee(billableHours);
  let subtotal = applyMaximumDailyCap(baseFee);
  subtotal = applyLostTicketFee(subtotal, isLostTicket);
  subtotal = applyPromoCode(subtotal, promoCode);
  const finalAmount = calculateFinalAmount(subtotal);
  
  return {
    duration: parseFloat(duration.toFixed(2)),
    billableHours,
    baseFee: parseFloat(baseFee.toFixed(2)),
    afterCap: parseFloat(subtotal.toFixed(2)),
    hasLostTicket: isLostTicket,
    promoCode: promoCode || 'NONE',
    finalAmount
  };
}

/**
 * Validates parking fee is within reasonable bounds.
 * @param {number} fee - The fee to validate
 * @returns {boolean} True if fee is valid (non-negative)
 */
export function isValidFee(fee) {
  return typeof fee === 'number' && fee >= 0;
}

/**
 * Formats a fee as a currency string.
 * @param {number} fee - The fee to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(fee) {
  return '$' + parseFloat(fee).toFixed(2);
}
