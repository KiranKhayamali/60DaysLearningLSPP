import express from "express";
import routes from "./routes/index.mjs"

const app = express();

app.use(express.json()); //middleware
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { //localhost:3000
    console.log(`Server running on port ${PORT}`);
});

//GET requests
app.get("/", (request, response, next) => {
    console.log("Base URL 1");
    next();
}, (request, response, next) => {
    console.log("Base URL 2");
    next();
}, (request, response, next) => {
    console.log("Base URL 3");
    next();
}, (request, response) => {
    response.status(201).send({msg : "Hello World!"});
});





