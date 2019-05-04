// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err,client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    };

    const db = client.db('TodoApp2');

    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({_id: new ObjectID('5cbdd13ec13fa22ec02cae3a')}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // });

    // db.collection('Todos').find({_id: new ObjectID('5cbdd13ec13fa22ec02cae3a')}).count().then((result) => {
    //     console.log(result);
    // });
    

    db.collection('Users').find({name: "Andrew"}).count().then((result) => {
        console.log(`Number of Andrews: ${result}`)
    }, (err) => {
        console.log('Fuck off');
    })

    client.close();
})