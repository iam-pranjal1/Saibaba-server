import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, "Please enter a valid email address."],
    },
    mobile: {
      type: String,
      required: [true, "Mobile is required."],
      unique: true,
      trim: true,
      match: [/^\d{10}$/, "Mobile number should be 10 digits long."],
    },
    pincode: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    street: {
      type: String,
      trim: true,
    },
    aadhar: {
      type: String,
      required: [true, "Aadhar number is required."],
      unique: true,
      trim: true,
      match: [/^\d{12}$/, "Aadhar number should be 12 digits long."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [6, "Password should be at least 6 characters long."],
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model('users', userSchema);
export default userModel;
