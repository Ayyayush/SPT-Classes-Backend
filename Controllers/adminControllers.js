import AdminRegistrationForm from "../Schema/adminRegistrationFormSchema.js";

export async function addStudentInfo(req, res) {
    try {
        console.log("inside addStudentInfo")
        const { studentDetails } = req?.body;
        // console.log(studentDetails) //
        // {
        // studentFullName: 'Taher Malik',
        // studentPhoneNumber: '9152760580',
        // studentAge: '18-22',
        // studentEmailId: 'taher@gmail.com',
        // studentDomain: 'app-dev',
        // assistance: false
        // }

        if (!studentDetails) return res.status(400).json({ message: "Details not found", flag: false })
        const result = await AdminRegistrationForm.findOne({ studentEmailId: studentDetails.studentEmailId });
        if (result) {
            await AdminRegistrationForm.findOneAndUpdate({ studentEmailId: studentDetails.studentEmailId }, {
                $set: {
                    studentAge: studentDetails.studentAge,
                    studentFullName: studentDetails.studentFullName,
                    studentPhoneNumber: studentDetails.studentPhoneNumber,
                    studentDomain: studentDetails.studentDomain,
                    needGuidance: studentDetails.needGuidance
                }
            })
            return res.status(200).json({ message: "Student Data updated", flag: false })
        } else {
            await AdminRegistrationForm.create({
                studentAge: studentDetails.studentAge,
                studentFullName: studentDetails.studentFullName,
                studentEmailId: studentDetails.studentEmailId,
                studentPhoneNumber: studentDetails.studentPhoneNumber,
                studentDomain: studentDetails.studentDomain,
                needGuidance: studentDetails.needGuidance
            })
            return res.status(201).json({message:"Data saved successfully",flag:true})

        }

    } catch (error) {
        console.log("error while adding student info" + error)
        return res.status(500).json({message:"Something went wrong at the server side",flag:false})
    }
}