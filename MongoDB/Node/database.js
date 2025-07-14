const { MongoClient } = require("mongodb");

let dbConnection;
let uri = "mongodb+srv://kirankhayamali:vntUn18ZqSktcXsc@cluster0.cqipsvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

module.exports = {
    connectToDb: (cb) => {
        // MongoClient.connect("mongodb://localhost:27017/bookstore")
        MongoClient.connect(uri)
        .then((client) => {
            dbConnection = client.db();
            return cb();
        })
        .catch(err => {
            console.log(err);
            return cb(err);
        })
    },
    getDb: () => dbConnection
};