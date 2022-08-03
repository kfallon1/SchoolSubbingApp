const mongoose = require('mongoose');

const teacherCategorySchema = mongoose.Schema({
    name: {
        type:String, 
        required: true
    },
    icon: {
        type:String, 
    },
    colour: {
        type:String, 
    }
})

teacherCategorySchema.virtual('id').get (function () {
    return this._id.toHexString();
     })

//Enable function when sending data as JSON object virtuals enabled
teacherCategorySchema.set('toJSON', {
virtuals:true,
})


exports.TeacherCategory = mongoose.model('TeacherCategory', teacherCategorySchema);
