const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateToDo, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateToDo);

describe('POST /todos', () =>{
   it('should create a new todo', (done) => {
      var text = 'Text todo text';

      request(app)
          .post('/todos')
          .set('x-auth', users[0].tokens[0].token)
          .send({text})
          .expect(200)
          .expect((res) => {
              expect(res.body.text).toBe(text);
          })
          .end((err, res) => {
            if (err) {
                done(err)
            }

            Todo.find({text}).then((todos) =>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => {
                done(e);
            });
          });
   });

   it('should not create todo with invalid body data', (done) => {
       request(app)
           .post('/todos')
           .send({})
           .set('x-auth', users[0].tokens[0].token)
           .expect(400)
           .end((err, res) => {
                if (err) {
                    done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => {
                    done(e);
                });
           });
   });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);
            })
            .end(done);
    });
});

describe('GET /todos:id', () => {
   it('should return todo doc', (done) => {
       request(app)
           .get(`/todos/${todos[0]._id.toHexString()}`)
           .set('x-auth', users[0].tokens[0].token)
           .expect(200)
           .expect((res) => {
               expect(res.body.todos.text).toBe(todos[0].text);
           })
           .end(done);
   });

   it('should return 404 if todo not found', (done) => {
       var id = new ObjectID().toHexString();
      request(app)
          .get(`/todos/${id}`)
          .set('x-auth', users[0].tokens[0].token)
          .expect(404)
          .end(done);
   });

    it('should return 404 for non-object ids', (done) => {
        var id = '123abc';
        request(app)
            .get(`/todos/${id}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return 400 for non-object ids', (done) => {
        var id = '123abc';
        request(app)
            .delete(`/todos/${id}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos:id', () => {
    it('should update the todo', (done) => {
        var id = todos[0]._id.toHexString();
        var text = 'This should be a new text.';
        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth', users[0].tokens[0].token)
            .send({completed: true, text})
            .expect(200)
            .expect((res) =>{
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var id = todos[0]._id.toHexString();
        var text = 'This should be a new text.';
        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth', users[0].tokens[0].token)
            .send({completed: false, text})
            .expect(200)
            .expect((res) =>{
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });
});

describe('Get /users/me', () => {
   it('should return user if authenticated', (done) => {
      request(app)
          .get('/users/me')
          .set('x-auth', users[0].tokens[0].token)
          .expect(200)
          .expect((res) => {
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
          })
          .end(done);
   }) ;

   it('shoudl reutnr 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
   });
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        var email ='example@example.com';
        var password = '123mnb!';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end(done);
    });

    it('should return validation errors if request invalid', (done) => {
        var email ='and';
        var password = '123';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done);
    });

    it('should not create user if email in user', (done) => {
        var email ='123@example.com';
        var password = '123mnb!';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(400)
            .end(done);
    });
});