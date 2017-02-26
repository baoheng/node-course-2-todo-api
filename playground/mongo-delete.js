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

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    // deleteOne
    // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
    //    console.log(result);
    // });
    // findOneAndDelete
    db.collection('Todos').findOneAndDelete({text: 'eat lunch'}).then((result) => {
       console.log(result);
    });
    db.close();
});
