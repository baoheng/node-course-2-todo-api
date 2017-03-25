const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

var password = '123abc';

// bcryptjs.genSalt(10, (err, salt) => {
//     bcryptjs.hash(password, salt, (err, hash) => {
//        console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$QPq8SBAqUzg0.XV1/RE2eOsCb9N/6mUZw3ObSfC2vXlLGBYqsQF6a';

bcryptjs.compare(password, hashedPassword, (err, result) => {
   console.log(result);
});

// var data = {
//     id: 10
// }
// // create hash
// var token = jwt.sign(data, '123abc');
// // verify token
// var decoded = jwt.verify(token, '123abc');

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(message);
// console.log(hash);
//
// var data = {
//     id: 4
// };
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
//
// if (resultHash === token.hash) {
//     console.log('Data remain the same');
// } else {
//     console.log('Data was changed');
// }