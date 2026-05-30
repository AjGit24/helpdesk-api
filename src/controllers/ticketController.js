const Ticket = require('../models/Ticket');
const getTickets = async (req, res) => {
    try {
        const {status, priority, category} = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (category) filter.category = category;

        const tickets = await Ticket.find(filter)
        .populate('submittedBy', 'name email')
        .populate('assignedTo', 'name email')
        .sort({createdAt: -1});

        res.json(tickets);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

const createTicket = async (req, res) => {
    try{
        const {title, description, priority, category} = req.body;

        const ticket = await Ticket.create({
            title, 
            description, 
            priority, 
            category, 
            submittedBy: req.user._id,
        });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
        .populate('submittedBy', 'name email')
        .populate('assignedTo', 'name email');

        if (!ticket) {
            res.status(404),json({message: 'Ticket not found'});
        } 
        res.json(ticket);

    } catch (error){
        res.status(500).json({message: error.message});
    }
};

module.exports = {getTickets, createTicket, getTicketById}