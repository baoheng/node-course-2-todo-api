const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '58b27030aaf129164d829277';

if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
}
// Todo.find({
//    _id: id
// }).then((todos) => {
//     console.log('Todos: ',todos);
// });
//
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ',todos);
// });

// Todo.findById(id).then((todos) => {
//     if(!todos){
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id', todos);
// }).catch((e) => {
//     console.log(e);
// });

User.findById(id).then((users) => {
    if (!users) {
        return console.log('Users not found');
    }

    console.log('User: ', users);
}).catch((e) => {
    console.log(e);
});
