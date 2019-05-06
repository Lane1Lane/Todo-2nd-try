// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err,client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    };

    const db = client.db('TodoApp2');

    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({text: "Something to do 2"},
    //     {$set: {text: "Something to do new"}
    //     }, {
    //         returnOriginal: false
    //     }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({_id: new ObjectID('5ccc1c804d2e85378c91df59')},
    {$inc: {age: 10}
    }, {
        returnOriginal: false
    }).then((result) => {
    console.log(result);
});

    client.close();
})