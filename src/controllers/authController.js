const { json } = require('node:stream/consumers');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign({id, role }, process.env.JWT_SECRET, { expiresIn: '7d'});
};

const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: 'Email already in use'});
        }

        const user = await User.create({
            name, 
            email, 
            passwordHash: password, 
            role,
        });

        res.status(201).json({
            token: generateToken(user._id, user.role),
            user: {
                id: user._id,
                name: user.name, 
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        res.json({
            token: generateToken(user._id, user.role),
            user: {
                id: user._id, 
                name: user.name,
                email: user.email, 
                role: user.role,
            },
        });
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

module.exports = {register, login};