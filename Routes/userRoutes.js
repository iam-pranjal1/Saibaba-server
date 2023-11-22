import express from 'express';
import bcrypt from 'bcrypt';
import userModel from '../Model/userModel.js';

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
    try {
        const {

            name,
            email,
            mobile,
            pincode,
            state,
            city,
            street,
            password,
            aadhar

    } = req.body;

        // Check if the email is already in use
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password before saving it
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new userModel({
            name,
            email,
            mobile,
            pincode,
            state,
            city,
            street,
            password: hashedPassword,
            aadhar,
        });

        const user = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Something went wrong while registering the user', error: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.status(200).json(user);
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Something went wrong while logging in', error: error.message });
    }
});

// Get All Users Route
router.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while fetching users', error: error.message });
    }
});

// Find User by ID Route
router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userModel.findById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong while fetching user', error: error.message });
    }
});

export default router;
