const Ticket = require('../models/Ticket');

const getSummary = async (req, res) => {
    try {
        const statusCounts = await Ticket.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
            { $sort: {count: -1} },
        ]);

        const priorityCounts = await Ticket.aggregate([
            {
                $group: {
                    _id: '$priority',
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
        ]);

        const categoryCounts = await Ticket.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
            { $sort: {count: -1 } },
        ]);

        res.json({ statusCounts, priorityCounts, categoryCounts});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getResolutionTime = async (req, res) => {
    try {
        const data = await Ticket.aggregate([
            { $match: {status: 'resolved', resolvedAt: { $ne: null} } },
            {
                $group: {
                    _id: '$priority',
                    avgResolutionHours: {
                        $avg: {
                            $divide: [
                                { $subtract: ['$resolvedAt', '$createdAt'] },
                                3600000,
                            ],
                        },
                    },
                    count: { $sum: 1 },
                },
            },
            { $sort: {avgResolutionHours: 1 } },
        ]);

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSummary, getResolutionTime };