const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res) {
        return Todo
        .create({
            title: req.body.title,
        })
        .then(todo => res.status(201).send(todo))
        .catch(error => res.status(400).send(error));
    },
    //fetching all todos from db
    list(req, res) {
        return Todo
        .all()
        .then(todos => res.status(200).send(todos))
        .catch(error => res.status(400).send(error));
    },
    //fetches all todoItems of their respective todo
    list(req, res){
        return Todo
        .findAll({
            include: [{
                model: TodoItem,
                as: 'todoItems'
            }],
        })
        .then(todos => res.status(200).send(todos))
        .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Todo
        .findById(req.params.todoId, {
            include: [{
                model: TodoItem,
                as: 'todoItems'
            }],
        })
        .then(todo =>{
            if (!todo) {
                return res.status(404).send({
                    message: 'Todo not found'
                });
            }
            return res.status(200).send(todo)
        })
        .catch(error => res.status(400).send(error));
    }
};