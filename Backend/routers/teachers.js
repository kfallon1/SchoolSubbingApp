const {Teacher} = require('../models/teacher'); //import a teacher from models package
const express= require ('express'); //express used to build application
const router = express.Router(); //router part of express

//APIs: get, post, etc.
//initial route for the application takes 2 parameters. 1st one is route, 2nd is callback that is sent to client
//`` and $ sign use JSON objects 

//This method is getting the list of teachers
//${api}/teachers was original route but don't need now as teachersRouter declared in App JS
router.get(`/`, async (req, res) => {
    const teacherList = await Teacher.find(); 

//await and asynce wait for list to be built before sending to Front end same function as below but less code (Promise Function/Do then in the post)
    if (!teacherList) {
        res.status(500).json({success:false})
    }
    res.send(teacherList); //response here sends teacher to front end
} )

//Next method for creating a teacher
router.post(`/`, (req, res) => {
    const teacher = new Teacher({
        firstName: req.body.firstName,
        secondName: req.body.lastName,
        image: req.body.image
    })

    teacher.save().then ((createdTeacher => {
        res.status(201).json(createdTeacher)
    })).catch((err)=> {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})
//export the router
module.exports = router;