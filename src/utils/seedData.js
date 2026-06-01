require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Ticket = require('../models/Ticket');

const users = [
  { name: 'Ajaan', email: 'ajaan@test.com', passwordHash: 'password123', role: 'admin' },
  { name: 'Sarah Agent', email: 'sarah@test.com', passwordHash: 'password123', role: 'agent' },
  { name: 'Mike Agent', email: 'mike@test.com', passwordHash: 'password123', role: 'agent' },
  { name: 'Alice User', email: 'alice@test.com', passwordHash: 'password123', role: 'user' },
  { name: 'Bob User', email: 'bob@test.com', passwordHash: 'password123', role: 'user' },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Ticket.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    const createdUsers = await User.create(users);
    console.log('Users created');

    const admin = createdUsers[0];
    const agents = createdUsers.slice(1, 3);
    const endUsers = createdUsers.slice(3);

    const tickets = [
      { title: 'Cannot access VPN', description: 'Getting auth error on VPN login', status: 'resolved', priority: 'critical', category: 'network', submittedBy: endUsers[0]._id, assignedTo: agents[0]._id, resolvedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { title: 'Outlook not syncing', description: 'Emails not loading since this morning', status: 'resolved', priority: 'high', category: 'software', submittedBy: endUsers[1]._id, assignedTo: agents[1]._id, resolvedAt: new Date(Date.now() - 5 * 60 * 60 * 1000) },
      { title: 'New laptop setup', description: 'Need help setting up new MacBook', status: 'resolved', priority: 'medium', category: 'hardware', submittedBy: endUsers[0]._id, assignedTo: agents[0]._id, resolvedAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      { title: 'Printer offline', description: 'Office printer not responding', status: 'in-progress', priority: 'medium', category: 'hardware', submittedBy: endUsers[1]._id, assignedTo: agents[1]._id },
      { title: 'Reset password', description: 'Locked out of admin account', status: 'in-progress', priority: 'high', category: 'access', submittedBy: endUsers[0]._id, assignedTo: agents[0]._id },
      { title: 'Slack not loading', description: 'App crashes on startup', status: 'open', priority: 'low', category: 'software', submittedBy: endUsers[1]._id },
      { title: 'Monitor flickering', description: 'Second monitor has display issues', status: 'open', priority: 'medium', category: 'hardware', submittedBy: endUsers[0]._id },
      { title: 'Need admin access', description: 'Requesting elevated permissions for project', status: 'open', priority: 'high', category: 'access', submittedBy: endUsers[1]._id },
      { title: 'WiFi dropping', description: 'Connection drops every 30 minutes', status: 'resolved', priority: 'critical', category: 'network', submittedBy: endUsers[0]._id, assignedTo: agents[1]._id, resolvedAt: new Date(Date.now() - 48 * 60 * 60 * 1000) },
      { title: 'Software license expired', description: 'Adobe CC license needs renewal', status: 'open', priority: 'medium', category: 'software', submittedBy: endUsers[1]._id },
    ];

    await Ticket.create(tickets);
    console.log('Tickets created');

    console.log('Seed complete');
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedDB();