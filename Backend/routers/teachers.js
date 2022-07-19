const {Teacher} = require('../models/teacher'); //import a teacher from models package
const express= require ('express'); //express used to build application
const {TeacherCategory } = require('../models/teacherCategory'); //import teacher Categoires 
const router = express.Router(); //router part of express
const mongoose = require('mongoose');

//APIs: get, post, etc.
//initial route for the application takes 2 parameters. 1st one is route, 2nd is callback that is sent to client
//`` and $ sign use JSON objects 

//This method is getting the list of teachers
//${api}/teachers was original route but don't need now as teachersRouter declared in App JS

router.get(`/`, async (req, res) => {
    const teacherList = await Teacher.find().populate('teacherCategory');  //populate function attaches category 

//await and asynce wait for list to be built before sending to Front end same function as below but less code (Promise Function/Do then in the post)
    if (!teacherList) {
        res.status(500).json({success:false})
    }
    res.send(teacherList); //response here sends teacher to front end
} )

//Special Method/API to only SELECT details I want in list eg. Name & Availability See Lec 34 if need
router.get(`/`, async (req, res) => {
    const teacherList = await Teacher.find().select('name', 'image', 'isAvailable', '-id'); 

//await and asynce wait for list to be built before sending to Front end same function as below but less code (Promise Function/Do then in the post)
    if (!teacherList) {
        res.status(500).json({success:false})
    }
    res.send(teacherList); //response here sends teacher to front end
} )

//Get method for 1 teacher and ID after /
router.get(`/:id`, async (req, res) => {
    const teacher = await Teacher.findById(req.params.id).populate('teacherCategory'); 

    if (!teacher) {
        res.status(500).json({success:false})
    }
    res.send(teacher);
} )


//POST (method for creating a new Teacher)
router.post(`/`, async (req, res) => {


    const teacherCategory = await TeacherCategory.findById(req.body.teacherCategory); //THIS LINE NOT WORKING??? It has worked see EndaFallon and Pat Fallon. Works but crashes the app now
    if (!teacherCategory) return res.status(400).send('Invalid Teacher Category');

    const teacher = new Teacher({
        name: req.body.name,
        image: req.body.image,
        teacherCategory: req.body.teacherCategory,
        isAvailable: req.body.isAvailable,
    }) ;

    teacher = await teacher.save(); //line creates new teacher after saving inputs from above

    if (!teacher) 
    return res.status(500).send('The teacher cannot be created') //if no teacher send server error

    res.send(teacher); //all going well send the teacher created
})

//PUT METHOD (UPDATE a TEACHER)
router.put('/:id',async (req, res)=> {
    const teacherCategory = await TeacherCategory.findById(req.body.teacherCategory); //THIS LINE NOT WORKING??? It has worked see EndaFallon and Pat Fallon. Works but crashes the app now
    if (!teacherCategory) return res.status(400).send('Invalid Teacher Category');

    const teacher = await Teacher.findByIdAndUpdate(

        
        req.params.id,
        {
            name: req.body.name,
        image: req.body.image,
        teacherCategory: req.body.teacherCategory,
        isAvailable: req.body.isAvailable,
        },
        { new: true}
    )

    if(!teacher)
    return res.status(500).send('the teacher cannot be updated!')

    res.send(teacher);
})

//export the router
module.exports = router;