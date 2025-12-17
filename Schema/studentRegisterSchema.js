import mongoose from "mongoose";

const studentRegisterSchema = new mongoose.Schema(
  {
    studentFullName: {
      type: String,
      required: true,
      trim: true,
    },
    studentEmailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[a-zA-Z0-9]+@gmail\.(com|in|net|org)$/
    },
    password:{
        type:String,
        required:true,
        minlength: 6,
        select: false
    },
    TC: {
      type: Boolean,
      required: true,
      default:false,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const StudentRegister = mongoose.model("StudentRegister", studentRegisterSchema);

export default StudentRegister;