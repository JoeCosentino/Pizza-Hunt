const { Schema, model } = require('mongoose');
// setting the model equal to the variable 'Pizza' so that
// we can appropriately export it to other files

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;