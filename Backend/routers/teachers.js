const {Teacher} = require('../models/teacher'); //import a teacher from models package
const express= require ('express'); //express used to build application
const {TeacherCategory } = require('../models/teacherCategory'); //import teacher Categoires 
const router = express.Router(); //router part of express
const mongoose = require('mongoose'); //this is needed for the isValivObjectID method

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

//GET method for count no. of teachers. Concept same for any variable/object
//NOT working yet not sure why?
router.get(`/get/count`, async (req, res) => {
    const teacherCount = await Teacher.countDocuments((count) => count);

    if (!teacherCount) {
        res.status(500).json({ success: false });
    }
    res.send(teacherCount);
});

//GET method for available teachers WORKING FINE     
router.get(`/get/available`, async (req, res) => {
    //Limit/Count feature in 39 which haven't implemented think to show like 0 - 3 etc rather than all featured/available
    const teachers = await Teacher.find({isAvailable: true});

    if (!teachers) {
        res.status(500).json({ success: false });
    }
    res.send(teachers);
});

//GET request sorting by Teacher Categories...Have an idea of this but study again when time
//THis is working ?teacherCategories= id, id can also work showing 2 categories 
router.get(`/`, async (req, res) => {
    let filter = {};  // filter contains the array of possible values defined outside first so accessible and make sure empty object 
    if (req.query.teacherCategories) {

        filter = { teacherCategories: req.query.teacherCategories.split(',') }; //this says what teacherCategoires is: split and comma seperates the values
    }

    const teacherList = await Teacher.find(filter).populate('teacherCategory');

    if (!teacherList) {
        res.status(500).json({ success: false });
    }
    res.send(teacherList);
});

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
    if (!mongoose.isValidObjectId(req.params.id)) {         //This method throws error if the id passed is not valid, guess will need in all methods using ID
        return res.status(400).send('Invalid Teacher ID')
    }
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

//DELETE METHOD (DELETE)
router.delete('/:id', async (req,res)=>{
    //url will be api/v1/teacher/IDwhichWillBeDeleted
     
    Teacher.findByIdAndRemove(req.params.id).then (teacher => {
        if(teacher) {
            return res.status(200).json({success: true, message: 'the teacher is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "teacher not found!"})
        }
    }).catch(err=>{ //Catches a server error
       return res.status(500).json({success: false, error: err}) 
    })


    })




//export the router
module.exports = router;