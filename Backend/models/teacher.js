//make sure to put in mongoose, the const here is similar to import 
const mongoose = require('mongoose');

//This is the schema/model layer to create an object pretty sure
const teacherSchema = mongoose.Schema ({
        firstName: {
        type:String, 
        required: true
    },  //this is the function to make first name required, throws JSON error now

        lastName: String,
        image: String
    })

 exports.Teacher = mongoose.model('Teacher', teacherSchema);
 //exports part lets the object be seen in any other file 