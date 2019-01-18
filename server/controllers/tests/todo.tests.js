const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../../../app');

chai.use(chaiHttp);

describe('Todo lists', ()=> {
    it('Should create a todo', () =>{
        let record = {
            title: 'test task'
        }
        chai.request(app)
        .post('/api/todos')
        .type('form')
        .send(record)
        .end((err,res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
        });
    });
    it('Should fetch all todos', () =>{
       
        chai.request(app)
        .get('/api/todos')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.not.be.undefined;
            expect(res).to.be.an('object');
        });
    });
    it('Should fetch a single todo', () =>{
        let record = {
            id: 1,
            title: 'test task'
        }
        chai.request(app)
        .get('/api/todos/'+record.id)
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
        });
    });
    it('Should edit a todo', () =>{
        let record = {
            id: 1,
            title: 'test task'
        }
        chai.request(app)
        .put('/api/todos/'+record.id)
        .type('form')
        .send({title: 'update task'})
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
        });
    });
    it('Should delete a todo', () =>{
        let record = {
            id: 1,
            title: 'test task'
        }
        chai.request(app)
        .delete('/api/todos/'+record.id)
        .type('form')
        .send(record)
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(204);
        });
    });
});