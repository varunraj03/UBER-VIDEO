const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;
        const firstname = fullname?.firstname;
        const lastname = fullname?.lastname || '';  // Optional

        // Hash the password
        const hashedPassword = await userModel.hashPassword(password);

        // Create user
        const user = await userService.createUser({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        // Generate token
        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (err) {
        console.error('Register User Error:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};