const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");

dotenv.config(); //loading environment variables

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server is running at port 5000");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

app.get("/", (req, res) => {
    res.send("Blog API is running....");
});

app.use("/api/auth", authRoutes);

