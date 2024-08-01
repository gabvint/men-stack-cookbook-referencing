const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    }

});

const Ingredient = mongoose.model('Ingredient', ingredientsSchema);
module.exports = Ingredient;