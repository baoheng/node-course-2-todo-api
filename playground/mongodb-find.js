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

    // db.collection('Todos').find({
    //     _id: new ObjectID('589f70b0fd70010499ebcd1c')
    // }).toArray().then((docs) => {
    //    console.log('Todos');
    //    console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Alden'}).toArray().then((docs) => {
       console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch users');
    });

    db.close();
});