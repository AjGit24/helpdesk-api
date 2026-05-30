const express = require('express');
const router = express.Router();
const {getTickets, createTicket, getTicketById} = require('../controllers/ticketController');
const {protect} = require('../middleware/auth');

router.get('/', protect, getTickets);
router.post('/', protect, createTicket);
router.get('/:id', protect, getTicketById);

module.exports = router;