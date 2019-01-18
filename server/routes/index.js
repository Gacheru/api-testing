'use strict'

const todosController = require('../controllers').todos;
const todoitemsController = require('../controllers').todoItems;

module.exports = (app) => {
   
    app.get('/api', (req,res) => res.status(200).send({
        message: 'welcome to the Todos API'
    }));

    //mock routes
    // app.get('/api//mocks/todo', todoMock.lists);

    app.post('/api/todos', todosController.create);
    app.get('/api/todos', todosController.list);
    app.get('/api/todos/:todoId', todosController.retrieve);
    app.put('/api/todos/:todoId', todosController.update);
    app.delete('/api/todos/:todoId',todosController.destroy );

    app.post('/api/todos/:todoId/items', todoitemsController.create);
    app.put('/api/todos/:todoId/Items/:todoItemId', todoitemsController.update);
    app.delete('/api/todos/:todoId/Items/:todoItemId', todoitemsController.destroy);

    // for any other requests method on todo itemss
    app.all('/api/todos/:todoId/items', (req, res) => res.status(405).send({
        message: 'Method Not Allowed',
    }));
};