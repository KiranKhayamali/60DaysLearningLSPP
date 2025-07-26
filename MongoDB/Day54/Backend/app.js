const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const postRoutes = require("./routes/post.js");
const commentRoutes = require("./routes/comment.js");
const dotenv = require("dotenv");

dotenv.config(); //loading environment variables

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.listen(PORT, () => {
    console.log("Server is running at port 5000");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

app.get("/", (req, res) => {
    res.send("Blog API is running....");
});

