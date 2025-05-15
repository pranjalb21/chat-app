const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields required." });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const user = new User({ username, password });
        await user.save();
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "4h",
        });

        res.status(201).json({
            message: "User registered successfully.",
            token,
            username: user.username,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error While Signup",
            error: error.message,
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields required." });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: "4h",
        });

        res.status(200).json({
            message: "Login successfull.",
            username: user.username,
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error While Login",
            error: error.message,
        });
    }
});
module.exports = router;
