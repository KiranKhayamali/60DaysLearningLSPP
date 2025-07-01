import express, { response } from 'express';

const app = express();

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


