const express = require("express");
const { connectToDb, getDb} = require("./database");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

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
    const page = req.query.p || 0; //current page
    const booksPerPage = 3;

    let books = [];

    db.collection("books")
        .find() //cursor toArray forEach
        .sort({author: 1})
        .skip(page * booksPerPage)
        .limit(booksPerPage)
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books);
        }) 
        .catch(() => {
            res.status(500).json({error: "Could not fetch the documents"});
        });
});

app.get("/books/:id", (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        db.collection("books")
            .findOne({_id: new ObjectId(req.params.id)})
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                res.status(500).json({error: "Could not fetch the document"});
            });
    } else {
        res.status(404).json({error: "Not a valid doc id"});
    };

});
