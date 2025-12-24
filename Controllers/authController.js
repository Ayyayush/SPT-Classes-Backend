// User model import kar rahe hain
// Ye MongoDB ke users collection se baat karega
import User from "../Schema/userSchema.js";

// JWT token generate karne ke liye
import jwt from "jsonwebtoken";
import StudentRegister from "../Schema/studentRegisterSchema.js";
import bcrypt from "bcrypt";

// ======================= REGISTER (SIGNUP) =======================
export async function registerStudent(req,res){
    try{
        console.log("Holaaaa")
        const studentDetials=req?.body?.studentDetials;
        // console.log(studentDetials)
        // studentDetials: {
        //     studentFullName: 'Taher Malik',
        //     studentEmailId: 'Malik@gmail.com',
        //     studentPassword: 'Taher@2002',
        //     TC: true
        // }

        if (!studentDetials) return res.status(400).json({ message: "Invalid request body", flag: false });

        const result=await StudentRegister.findOne({studentEmailId:studentDetials?.studentEmailId});
        if(result) return res.status(400).json({message:"User with this email is already registered",flag:false})

        const hashedPasswd=await bcrypt.hash(studentDetials?.studentPassword,10);

        await StudentRegister.create({
            studentFullName:studentDetials?.studentFullName,
            studentEmailId:studentDetials?.studentEmailId.toLowerCase(),
            studentPassword:hashedPasswd,
            TC:studentDetials?.TC
        })

        
        return res.status(201).json({message:"Student registered successfully",flag:true})


    }catch(error){
        console.log("Server fucked up at registering new student")
        return res.status(500).json({message:"Server problem",flag:false})
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
        const user = await StudentRegister.findOne({ studentEmailId:email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        // Password compare kar rahe hain
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.studentPassword
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid password",
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
