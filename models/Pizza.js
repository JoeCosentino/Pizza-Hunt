const { Schema, model } = require('mongoose');
// setting the model equal to the variable 'Pizza' so that
// we can appropriately export it to other files
const dateFormat = require('../utils/dateFormat')

const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String,
            // you can also do the following to give the user a different message:
            // required: 'You need to provide a pizza name!',
            required: true,
            trim: true
        },
        createdBy: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            required: true,
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
            default: 'Large'
        },
        toppings: [],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
})

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;