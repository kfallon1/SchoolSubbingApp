const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    passwordHash: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        default: ''
    },

    address: {
        type: String,
        default: ''
    },

    rollNumber: {
        type: String,
        default: ''
    },
    
    isAdmin: {
        type: Boolean,
        default: true
    },


})

//makes a new id field rather than the _id field from DB easier for front end to use
schoolSchema.virtual('id').get (function () {
    return this._id.toHexString();
     })

//Enable function when sending data as JSON object virtuals enabled
schoolSchema.set('toJSON', {
virtuals:true,
})


exports.School = mongoose.model('School', schoolSchema);
