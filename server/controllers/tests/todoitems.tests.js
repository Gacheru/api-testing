const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../../../app');

chai.use(chaiHttp);

describe('Todo Item test', ()=> {
    it('Should create a todo Item', () =>{
        let todo ={
            id: 1,
            title:'test todo'
        }
        let item = {
            content: 'test todo item',
            complete: false,
            todoId: todo.id
        }
        chai.request(app)
        .post('/api/todos/'+todo.id+'/items')
        .type('form')
        .send(item)
        .end((err,res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
        });
    });
    it('Should edit a todo Item', () =>{
        let todo ={
            id: 1,
            title:'test todo'
        }
        let item = {
            id: 1,
            content: 'test todo item - update',
            complete: true,
            todoId: todo.id
        }
        chai.request(app)
        .put('/api/todos/'+todo.id+'/items/'+item.id)
        .type('form')
        .send(item)
        .end((err,res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
        });
    });
    it('Should delete a todo Item', () =>{
        let todo ={
            id: 2,
            title:'test todo'
        }
        let item = {
            id: 1,
            content: 'test todo item',
            complete: true,
            todoId: todo.id
        }
        chai.request(app)
        .delete('/api/todos/'+todo.id+'/items/'+item.id)
        .type('form')
        .send(item)
        .end((err,res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(204);
        });
    });
});