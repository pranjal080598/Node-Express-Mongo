const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); //for true false values
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'confused';

MongoClient.connect(url, (err, client) => { //callback function

    assert.equal(err,null); //if error is null returns true

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);

                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                client.close();
                            });
                        });
                    });
            });
    });

});
