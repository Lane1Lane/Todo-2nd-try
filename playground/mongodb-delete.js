// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err,client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    };

    const db = client.db('TodoApp2');

    console.log('Connected to MongoDB server');

    // db.collection('Todos').deleteMany({text: "Eat lunch"}).then((result) => {
    //     console.log(result)
    // });

    // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').deleteMany({_id: new ObjectID('5cbdd316a9461f2fa0437c6d')}).then((result) => {
        console.log(result);
    });

    client.close();
})