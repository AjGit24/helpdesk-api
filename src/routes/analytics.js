const express = require('express');
const router = express.Router();
const { getSummary, getResolutionTime } = require('../controllers/analyticsController')
const { protect } = require('../middleware/auth');

router.get('/summary', protect, getSummary);
router.get('/resolution-time', protect, getResolutionTime);

module.exports = router;