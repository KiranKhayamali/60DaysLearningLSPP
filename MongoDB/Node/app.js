const express = require("express");
const { connectToDb, getDb} = require("./database");

const app = express();

let db;
connectToDb((err) => {
    if(!err) {
        const PORT = 3000; 
        app.listen(PORT, () => {
            console.log("App listening on port 3000");
        });
        db = getDb();
    };
});


app.get("/books", (req, res) => {
    let books = [];

    db.collection("books")
        .find() //cursor toArray forEach
        .sort({author: 1})
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books);
        }) 
        .catch(() => {
            res.status(500).json({error: "Could not fetch the documents"});
        });
});

