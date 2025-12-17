import StudentRegister from "../Schema/studentRegisterSchema.js";
import bcrypt from "bcrypt";

export async function registerStudent(req,res){
    try{
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