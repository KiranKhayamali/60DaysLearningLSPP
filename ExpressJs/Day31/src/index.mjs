import mongoose from "mongoose";
import { createApp } from "./createApp.mjs";


mongoose.connect("mongodb://localhost/express")
.then(() => console.log("Connected to Database"))
.catch((err) => console.log(`Error: ${err}`));

const app = createApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { //localhost:3000
    console.log(`Server running on port ${PORT}`);
});


