const express = require('express');
const router = express.Router();
const {getTickets, createTicket, getTicketById, updateTicket} = require('../controllers/ticketController');
const {protect, requireRole} = require('../middleware/auth');

router.get('/', protect, getTickets);
router.post('/', protect, createTicket);
router.get('/:id', protect, getTicketById);
router.patch('/:id', protect, requireRole('agent', 'admin'), updateTicket);

module.exports = router;