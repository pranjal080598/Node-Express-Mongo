const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); //for true false values
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'confused';

MongoClient.connect(url).then((client) => { //callback function

    

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    //called as "callback hell" as one is nested within the other and are syncronous therefore make use of promises for asynchronous
    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);

            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));
