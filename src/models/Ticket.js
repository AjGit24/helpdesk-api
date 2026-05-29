const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        description: {
            type: String, 
            required: [true, 'Description is required'],
        },
        status: {
            type: String,
            enum: ['open', 'in-progress', 'resolved', 'closed'],
            default: 'open',
        },
        priority: {
            type: String, 
            enum: ['low', 'medium', 'high', 'critical'],
            default: 'medium',
        },
        category: {
            type: String,
            enum: ['hardware', 'software', 'network', 'access', 'other'],
            default: 'other',
        },
        submittedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        resolvedAt: {
            type: Date, 
            default: null,
        },
    },
    {timestamps: true}
);

ticketSchema.index({status: 1, priority: 1});

module.exports = mongoose.model('Ticket', ticketSchema);