const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {         //guess change this to available and boolean when understand
        type: Number,
        required: true
    }
})

exports.School = mongoose.model('School', schoolSchema);
