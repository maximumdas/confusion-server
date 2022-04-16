const Dish = require('./../models/dishes');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

// localhost:3000/dish
dishRouter.route('/')
.get((req, res, next) => {
    Dish.find({}).then(dishes => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, error => next(error))
    .catch(err=> next(err));
})
.post((req, res, next) => {
    let newDish = Dish(req.body);
    newDish.save().then(dish => {
        console.log("dish created");

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, error => next(error))
    .catch(err=> next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put not supported');
})
.delete((req, res, next) => {
    Dish.remove({})
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, error => next(error))
    .catch(err=> next(err));
})

// localhost:3000/dish/{id}
dishRouter.route('/:dishId')
.get((req, res, next) => {
    Dish.findById({_id: req.params.dishId})
    .then(dish => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, error => next(error))
    .catch(err=> next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST not supported');
})
.put((req, res, next) => {
    Dish.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {new: true})
    .then(dish => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, error => next(error))
    .catch(err=> next(err));
})
.delete((req, res, next) => {
    Dish.findByIdAndRemove(req.params.dishId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }, error => next(error))
    .catch(err=> next(err));
});

module.exports = dishRouter;