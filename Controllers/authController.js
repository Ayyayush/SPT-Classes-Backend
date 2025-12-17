// User model import kar rahe hain
// Ye MongoDB ke users collection se baat karega
import User from "../Schema/userSchema.js";

// Password hash / compare ke liye bcrypt
import bcrypt from "bcryptjs";

// JWT token generate karne ke liye
import jwt from "jsonwebtoken";

// ======================= REGISTER (SIGNUP) =======================
export async function registerUser(req, res) {
    try {
        // Request body se name, email, password nikal rahe hain
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        // Check: user already exist karta hai ya nahi
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
                success: false,
            });
        }

        // Password ko hash kar rahe hain
        // 10 = salt rounds (standard)
        const hashedPassword = await bcrypt.hash(password, 10);

        // New user create kar rahe hain
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // JWT token generate kar rahe hain
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Success response
        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            token,
        });

    } catch (error) {
        console.log("Error in registerUser:", error.message);

        return res.status(500).json({
            message: "Server error during registration",
            success: false,
        });
    }
}

// ======================= LOGIN =======================
export async function loginUser(req, res) {
    try {
        // Request body se email & password nikal rahe hain
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
                success: false,
            });
        }

        // User database me find kar rahe hain
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        // Password compare kar rahe hain
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        // JWT token generate
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Login success
        return res.status(200).json({
            message: "Login successful",
            success: true,
            token,
        });

    } catch (error) {
        console.log("Error in loginUser:", error.message);

        return res.status(500).json({
            message: "Server error during login",
            success: false,
        });
    }
}
