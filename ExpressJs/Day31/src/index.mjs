import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json()); //middleware
app.use(cookieParser("secret"));
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { //localhost:3000
    console.log(`Server running on port ${PORT}`);
});

//GET requests
app.get("/", (request, response) => {
    response.cookie("hello", "world", {maxAge: 100000, signed: true});
    response.status(201).send({msg : "Hello World!"});
});







