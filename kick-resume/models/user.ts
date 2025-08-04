import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Password is required"],
//   },
//   credits: {
//     type: Number,
//     default: 100,
//   },
// });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: false, // 👈 Change this
  },
  credits: {
    type: Number,
    default: 100,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
