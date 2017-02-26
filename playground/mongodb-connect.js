// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
// ES6 destructing
// var user = {name: 'Alden', age: 25};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        // return from here, anything after this if statement will not execute
        return console.log('Unable to connect MongoDB server');
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Alden',
    //     age: 25,
    //     location: 'Seattle'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert user', user);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    // });

    db.close();
});