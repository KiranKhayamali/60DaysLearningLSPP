import express, { request, response } from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";
import passport from "passport";
import "./strategies/local_strategy.mjs";

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
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

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

// User authentication using session
// app.post("/api/auth", (request, response) => {
//     const {body: {username, password}} = request;
//     const findUser = mockUsers.find((user) => user.username ===username);
//     if (!findUser || findUser.password !== password) return response.status(401).send({msg: "BAD Credentials"});
//     request.session.user = findUser;
//     return response.status(200).send(findUser);
// });

// app.get("/api/auth/status", (request, response) => {
//     request.sessionStore.get(request.sessionID, (err, session) => {
//         console.log(session);
//     });
//     return request.session.user 
//         ? response.status(200).send(request.session.user)
//         : response.status(401).send({msg: "NOT Authenticated!"});
// });

// app.post("/api/cart", (request, response) => {
//     if (!request.session.user) return response.sendStatus(401);
//     const {body: item} = request;
//     const {cart} = request.session;
//     if (cart) {
//         cart.push(item);
//     } else {
//         request.session.cart = [item];
//     }
//     return response.status(201).send(item);
// });

// app.get("/api/cart", (request, response) => {
//     if(!request.session.user) return response.sendStatus(401);
//     return response.send(request.session.cart ?? []); //If cart is empty, it returns empty list
// });

// User authentication using passport
app.post("/api/auth", passport.authenticate("local"), (request, response) => {
    response.sendStatus(200);
});

app.get("/api/auth/status", (request, response) => {
    console.log("Inside /auth/status endpoint");
    console.log(request.user);
    console.log(request.session);
    return request.user ? response.send(request.user) : response.sendStatus(401);
});

app.post("/api/auth/logout", (request, response) => {
    if(!request.user) return response.sendStatus(401);
    request.logout((err) => {
        if (err) return response.sendStatus(400);
        response.send(200);
    });
});
