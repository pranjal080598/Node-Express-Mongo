const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); //for true false values

const url = 'mongodb://localhost:27017/';
const dbname = 'confused';

MongoClient.connect(url, (err, client) => { //callback function

    assert.equal(err,null); //if error is null returns true

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    collection.insertOne({"name": "Uthappizza", "description": "test"}, //one item to be inserted
    (err, result) => {
        assert.equal(err,null);

        console.log("After Insert:\n");
        console.log(result.ops); //ops is operations that is one operation is performed

        collection.find({}).toArray((err, docs) => {
            assert.equal(err,null);

            console.log("Found:\n");
            console.log(docs); // print docs

            db.dropCollection("dishes", (err, result) => {
                assert.equal(err,null);

                client.close();
            });
        });
      });

});
