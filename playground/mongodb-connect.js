// const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err,client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    };

    const db = client.db('TodoApp2');

    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do 2',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err)
    //     }

    //     console.log(result.ops);
    // })

    db.collection('Users').insertOne({
        name: 'Andrew',
        age: 25,
        location: 'Kyiv'
    }, (err,result) => {
        if (err) {
                return console.log('Unable to insert user', err)
            }
        
            console.log(result.ops);
    })

    client.close();
})