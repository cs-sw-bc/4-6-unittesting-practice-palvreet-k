// Server - Node.js server startup

import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Parking Lot Billing System running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/api/parking/health to check status`);
});
