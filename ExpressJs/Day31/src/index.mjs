import express, { request, response } from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";

const app = express();

app.use(express.json()); //middleware
app.use(cookieParser("secret"));
app.use(
    session({
        secret: "this is secret key", //This secret key should be well protected as password
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60, //60000 means 60 sec and its total 1 hrs

        }
    })
);

app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { //localhost:3000
    console.log(`Server running on port ${PORT}`);
});

//GET requests
app.get("/", (request, response) => {
    console.log(request.session);
    console.log(request.session.id);
    request.session.visited = true; //this helps to identify user
    response.cookie("hello", "world", {maxAge: 100000, signed: true});
    response.status(201).send({msg : "Hello World!"});
});

app.post("/api/auth", (request, response) => {
    const {body: {username, password}} = request;
    const findUser = mockUsers.find((user) => user.username ===username);
    if (!findUser || findUser.password !== password) return response.status(401).send({msg: "BAD Credentials"});
    request.session.user = findUser;
    return response.status(200).send(findUser);
});
