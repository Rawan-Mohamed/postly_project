import User from '../modules/users/user.model.js';
import bcrypt from 'bcrypt';

export const checkEmailExist = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        let hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;
        next();
    } catch (error) {
        console.error("Email check error:", error);
        return res.status(500).json({ message: "Database error" });
    }
};