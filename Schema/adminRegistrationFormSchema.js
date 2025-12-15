import mongoose from "mongoose";

const adminRegistrationFormSchema = new mongoose.Schema(
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
    studentPhoneNumber: {
      type: String,
      required: true,
      trim: true,
      match:/^[0-9]{10}$/
    },
    studentAge: {
      type: String,
      required: true,
    },
    studentDomain: {
      type: String,
      required: true,
      trim: true,
    },
    needGuidance: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const AdminRegistrationForm = mongoose.model("AdminRegistrationForm", adminRegistrationFormSchema);

export default AdminRegistrationForm;