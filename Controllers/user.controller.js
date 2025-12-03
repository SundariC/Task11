import User from "../Models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// Register a new user || Sign Up the new user

export const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User not registered", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(404).json({ message: "Invalid email" });
    }
    const passwordMatch = await bcrypt.compare(password, userDetails.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid password" });
    }
    // Generate JWT Token
    const token = jwt.sign({ _id: userDetails._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"});
      userDetails.token = token;
      await userDetails.save();
     res
      .status(200)
      .json({ message: "User logged in successfully", token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User not logged in", error: error.message });
  }
};

// Get user profile

export const getUser = async (req, res) => {
  try {
    const user = await User.find();
    res
    .status(200)
    .json({ message: "Admin user", data: user });
  } catch (error) {
    res.status(500).json({ message: "User not logged in unable to fetch users", error: error.message });
  }
};

