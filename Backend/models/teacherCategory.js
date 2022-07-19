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

exports.TeacherCategory = mongoose.model('TeacherCategory', teacherCategorySchema);
