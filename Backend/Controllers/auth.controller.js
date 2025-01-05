import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';

export const register = async (req, res) => {
    const { fullName, email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({
            success: false,
            message: "User already exists!"
        });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    try {
        user = await User.create({
            fullName,
            email,
            password: hashedPassword // Store hashed password
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully!",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, please try again later."
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials!"
            });
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '10d' } 
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
            secure: true, 
            sameSite: 'Lax'
        });

        return res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, please try again later."
        });
    }
};

// Logout Controller
export const logout = (req, res) => {
    res.cookie('token', '', { 
        httpOnly: true, 
        maxAge: 0,
        secure: true,
        sameSite: 'Lax'
    });

    // Step 2: Send a response indicating successful logout
    return res.status(200).json({
        success: true,
        message: "Logout successful!"
    });
};


export const getUserDetails = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        // Verify the token and extract payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user in the database
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            });
        }

        // Return user details
        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                // Add any other fields you want to include
            },
        });
    } catch (error) {
        console.error(error);

        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token has expired', error: error.message });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token', error: error.message });
        }

        return res.status(500).json({
            success: false,
            message: 'Server error, please try again later.',
        });
    }
};
