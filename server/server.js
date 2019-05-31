require('./config/config');

const _ = require('lodash');
const {ObjectID} = require('mongodb');

const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./modules/todo.js');
var {User} = require('./modules/user.js');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT; // Для Heroku

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    };

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        };
        
        res.send({todo});

    }).catch((e) => {res.status(400).send()})

});

app.delete('/todos/:id',(req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    };

    Todo.findByIdAndDelete(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        };

        res.send({todo});
    }).catch((e) => {res.staus(400).send()});
});

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    };

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({_id: new ObjectID(id)}, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        };

        res.send({todo});
    }).catch((e) => {res.status(400).send()});
});

app.post('/users', (req, res) => {
    var user = new User(_.pick(req.body,['name', 'email', 'password']));

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {res.status(400).send(e)})
});



app.get('/users/me', authenticate, (req, res) => {
    // var token = req.header('x-auth');

    // User.findByToken(token).then((user) => {
    //     if (!user) {
    //         return Promise.reject();
    //     }

    //     res.send(user);
    // }).catch((e) => {
    //     res.status(401).send();
    // });
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body,['email','password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port,() => {
    console.log(`Started at port ${port}`);
});

module.exports = {app};
