import User from './user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = async (req, res, next) => {
    try {
        // Hash the password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        // Create new user with hashed password
        const user = new User({
            ...req.body,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "User signed up successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(500).json({ message: "Error signing up" });
    }
};

const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log('Signin attempt:', {
            enteredEmail: req.body.email,
            enteredPassword: req.body.password,
            userFound: !!user,
            storedHash: user ? user.password : null
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
        console.log('Password match result:', passwordMatch);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        );
        res.status(200).json({
            message: "User signed in successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ message: "Error signing in" });
    }
};

export { signup, signin };