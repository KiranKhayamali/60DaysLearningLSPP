import express, { response } from 'express';

const app = express();

app.use(express.json()); //middleware

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
app.get("/", (request, response) => {
    response.status(201).send({msg : "Hello World!"});
});

app.get("/api/products", (request, response) => {
    response.send([
        {id: 123, name: "Iphone 16", price: "not afordable"}
    ])
});

//Query parameters
app.get("/api/users",  (request, response) => {
    console.log(request.query);
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
app.put("/api/users/:id", (request, response) => {
    const { body, params: {id},} = request;

    const parseID = parseInt(id);
    if (isNaN(parseID)) return response.sendStatus(400); //Invalid id

    const findUserIndex = mockUsers.findIndex((user) => user.id === parseID);
    if (findUserIndex === -1) return response.sendStatus(404);

    mockUsers[findUserIndex] = {id: parseID, ...body};
    return response.sendStatus(200);
});

//PATCH requests
app.patch("/api/users/:id", (request, response) => {
    const {body, params: {id}, } = request;
    const parseID = parseInt(id);
    if (isNaN(parseID)) return response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parseID);
    if (findUserIndex === -1) return response.sendStatus(404);
    mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body};
    return response.sendStatus(200);
});

//Route parameters
app.get("/api/users/:id", (request, response) => {
    // console.log(request.params); //for all users
    const parseID = parseInt(request.params.id);
    console.log(parseID);
    if (isNaN(parseID)) return response.status(400).send({msg: "Bad Request. Invalid ID!"});

    const findUser = mockUsers.find((user) => user.id === parseID);
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser);
});





