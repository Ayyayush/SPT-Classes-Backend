import mongoose from "mongoose";

// User schema for authentication (login / signup)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create model
const User = mongoose.model("User", userSchema);

// Export default (VERY IMPORTANT)
export default User;
