//make sure to put in mongoose, the const here is similar to import 
const mongoose = require('mongoose');

//This is the schema/model layer to create an object pretty sure
//Each schema links to a MongoDB collection 
const teacherSchema = mongoose.Schema ({
        name: {
        type:String, 
        required: true
    },  //this is the function to make name required, throws JSON error now

    image: {
        type: String,
        default: ''
    },

    teacherCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeacherCategory',
        //required:true
    }, //come back to this OBJECT ID? Link to teacherCategory

    isAvailable: {
        type: Boolean, 
        default: true,
    }})
//Virtuals copy _id field from DB and create an id field which can be used throughout the application, lose the _ from id
//Postman now shows the _id and also an id...DO this functions for ALL model classes 
teacherSchema.virtual('id').get (function () {
        return this._id.toHexString();
         })

//Enable function when sending data as JSON object virtuals enabled
teacherSchema.set('toJSON', {
    virtuals:true,
    })
    
 exports.Teacher = mongoose.model('Teacher', teacherSchema);
 //exports part lets the object be seen in any other file 