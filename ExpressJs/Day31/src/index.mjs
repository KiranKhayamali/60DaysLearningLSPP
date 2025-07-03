import express from "express";
import {query, validationResult} from "express-validator";


const app = express();

app.use(express.json()); //middleware

const loggingMiddleWare = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
};

// app.use(loggingMiddleWare, (request, response, next) => { //enabling middleware globally and we can implement multiple middleware
//     console.log("Finished Logging......");
//     next();
// }); 

const resolveIndexByUserId = (request, response, next) => { //Similar code from put, patch and delete request are overrid by middleware
    const { params: {id} } = request;

    const parseID = parseInt(id);
    if (isNaN(parseID)) return response.sendStatus(400); //Invalid id

    const findUserIndex = mockUsers.findIndex((user) => user.id === parseID);
    if (findUserIndex === -1) return response.sendStatus(404); 
    request.findUserIndex = findUserIndex;
    next(); 
};

const PORT = process.env.PORT || 3000;
const mockUsers = [
    {id: 1, username: "kiran", displayName: "Kiran"},
    {id: 2, username: "ashura", displayName: "Ashura"},
    {id: 3, username: "unknown", displayName: "Unknown"},
    {id: 4, username: "ded", displayName: "Dead"},
    {id: 5, username: "rere", displayName: "Rere"},
    {id: 6, username: "otokodes", displayName: "Aadim"},
    {id: 7, username: "yog-anish", displayName: "Anish"},
];

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

app.get("/api/products", (request, response) => {
    response.send([
        {id: 123, name: "Iphone 16", price: "not afordable"}
    ])
});

//Query parameters
app.get("/api/users", query("filter").isString().notEmpty().withMessage("Mustnot be empty").isLength({min: 3, max: 10}).withMessage("Must be 3 to 10 characters"), (request, response) => {
    const result = validationResult(request);
    console.log(result);
    const {query: {filter, value},} = request;
    //When filter and value are undefined
    // if (!filter && !value) return response.send(mockUsers);
    if (filter && value) return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
    );
    
    return response.send(mockUsers);
});

//POST requests
app.post("/api/users", (request, response) => {
    // console.log(request.body);
    const {body} = request;
    const newUser = { id: mockUsers[mockUsers.length -1].id +1, ...body };
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
});

//PUT requests
app.put("/api/users/:id",resolveIndexByUserId, (request, response) => {
    const {body, findUserIndex} = request;

    mockUsers[findUserIndex] = {id: mockUsers[findUserIndex].id, ...body};
    return response.sendStatus(200);
});

//PATCH requests
app.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const {body, findUserIndex, } = request;
    mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body};
    return response.sendStatus(200);
});

//DELETE requests
app.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const {findUserIndex} = request;
    mockUsers.splice(findUserIndex, 1); //delete the item
    return response.sendStatus(200);
});

//Route parameters
app.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
    const {findUserIndex} = request;
    const findUser = mockUsers[findUserIndex];
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser);
});





