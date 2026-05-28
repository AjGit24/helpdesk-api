const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const {protect} = require('./middleware/auth');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({message: 'Helpdesk API running'})
});

app.get('/api/protected', protect, (req, res) => {
    res.json({message: `Hello ${req.user.name}, you are authenticated`});
});

module.exports = app;