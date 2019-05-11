const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/modules/todo');
const {User} = require('../server/modules/user');

// const id = '5cd5120a91ba2e9ed0545ad111';

// if (!ObjectID.isValid(id)) {
//     console.log('Id not valid');
// }

// Todo.find({
//     _id : id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id : id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Todo not found');
//     }
//     console.log('Todo by id', todo);
// }).catch((e) => console.log(e));


var id = '5cd175691ef6d3383e30d0cf';

User.findById(id).then((user) => {
    if (!user) {
        return console.log('User not found');
    }
    console.log('User',user);
}).catch((e) => console.log(e));