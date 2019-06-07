const {ObjectID} = require('mongodb');
const {Todo} = require('./../../modules/todo');
const {User} = require('./../../modules/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const userOneToken = jwt.sign({_id: userOneId.toHexString(), access: 'auth'}, 'abc123').toString();
const userTwoToken = jwt.sign({_id: userTwoId.toHexString(), access: 'auth'}, 'abc123').toString();
const users = [{
    _id: userOneId,
    email: 'aaa@gmail.com',
    password: '1234567890',
    tokens: [{
        access: 'auth',
        token: userOneToken
    }]
},
{
    _id: userTwoId,
    email: 'bbb@gmail.com',
    password: 'qwerty',
    tokens: [{
      access: 'auth',
      token: userTwoToken
  }]
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
  }];

  const populateTodos = (done) => {
    Todo.deleteMany().then(() => {
      return Todo.insertMany(todos);
    }).then(() => done());
  };

  const populateUsers = (done) => {
    User.deleteMany().then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    }).then(() => done());
  };

  module.exports = {todos, populateTodos, users, populateUsers};