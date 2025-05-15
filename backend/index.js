const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const { Server } = require("socket.io");
const http = require("http");
const Message = require("./models/message");
const User = require("./models/user");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected."))
    .catch((err) => console.error(err));

app.use("/auth", authRoutes);

// socket io logic
io.on("connection", (socket) => {
    console.log("User connected.", socket.id);

    socket.on("send_message", async (data) => {
        const { sender, receiver, message } = data;
        const newMessage = new Message({ sender, receiver, message });
        await newMessage.save();
    });

    socket.broadcast.emit("receive_message", data);

    socket.on("disconnect", () => {
        console.log("User disconnected.", socket.id);
    });
});

app.get("/messages", async (req, res) => {
    try {
        const { sender, receiver } = req.query;
        const messages = await Message.find({
            $or: [{ sender, receiver }, { receiver: sender }],
        }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages." });
    }
});

app.get("/users", async (req, res) => {
    try {
        const { currentUser } = req.query;
        const users = await User.find({ username: { $ne: currentUser } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users." });
    }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
